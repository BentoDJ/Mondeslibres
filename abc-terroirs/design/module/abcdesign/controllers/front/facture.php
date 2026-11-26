<?php
/**
 * Page de confirmation de commande → bouton « Recevoir ma facture par e-mail ».
 * Reçoit le numéro de commande et sa clé de sécurité (présents dans l'adresse de la page de confirmation),
 * et envoie la facture PDF à l'adresse e-mail du client de la commande (jamais à une autre adresse).
 * Limité à 3 envois par commande et par jour, et 1 par minute (data/factures-envoyees.json).
 */
class AbcdesignFactureModuleFrontController extends ModuleFrontController
{
    const MAX_PAR_JOUR = 3;

    public function init()
    {
        parent::init();
        header('Content-Type: application/json; charset=utf-8');
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->repondre(false, 'Méthode non autorisée.');
        }
        $idCommande = (int) Tools::getValue('id_order');
        $cle = (string) Tools::getValue('key');
        $commande = new Order($idCommande);
        if (!Validate::isLoadedObject($commande) || !preg_match('/^[a-f0-9]{32}$/i', $cle) || !hash_equals((string) $commande->secure_key, $cle)) {
            $this->repondre(false, 'Commande introuvable.');
        }
        if (!$commande->invoice_number) {
            $this->repondre(false, 'La facture n\'est pas encore disponible : elle est créée dès que le paiement est validé.');
        }
        $client = new Customer((int) $commande->id_customer);
        if (!Validate::isLoadedObject($client) || !Validate::isEmail($client->email)) {
            $this->repondre(false, 'Adresse e-mail introuvable pour cette commande.');
        }

        // anti-abus
        $f = _PS_MODULE_DIR_ . 'abcdesign/data/factures-envoyees.json';
        $suivi = file_exists($f) ? (array) json_decode((string) @file_get_contents($f), true) : [];
        $aujourdhui = date('Y-m-d');
        $envois = array_values(array_filter(isset($suivi[$idCommande]) ? (array) $suivi[$idCommande] : [], function ($t) use ($aujourdhui) {
            return strpos((string) $t, $aujourdhui) === 0;
        }));
        if (count($envois) >= self::MAX_PAR_JOUR) {
            $this->repondre(false, 'La facture vous a déjà été envoyée plusieurs fois aujourd\'hui. Pensez à regarder dans vos courriers indésirables.');
        }
        if ($envois && time() - strtotime(end($envois)) < 60) {
            $this->repondre(true, 'La facture vient de vous être envoyée.');
        }

        // facture PDF
        $idLangue = (int) $commande->id_lang ?: (int) $this->context->language->id;
        $pdf = new PDF($commande->getInvoicesCollection(), PDF::TEMPLATE_INVOICE, $this->context->smarty);
        $contenu = $pdf->render(false);
        $nomFichier = Configuration::get('PS_INVOICE_PREFIX', $idLangue, null, $commande->id_shop) . sprintf('%06d', $commande->invoice_number) . '.pdf';

        $vars = [
            '{firstname}' => $client->firstname,
            '{lastname}' => $client->lastname,
            '{order_name}' => $commande->getUniqReference(),
        ];
        $ok = Mail::Send(
            $idLangue, 'facture', 'Votre facture ABC Terroirs – commande ' . $commande->getUniqReference(), $vars,
            $client->email, $client->firstname . ' ' . $client->lastname, null, null,
            ['content' => $contenu, 'name' => $nomFichier, 'mime' => 'application/pdf'], null,
            _PS_MODULE_DIR_ . 'abcdesign/mails/', false, (int) $commande->id_shop
        );
        if ($ok) {
            $envois[] = date('Y-m-d H:i:s');
            $suivi[$idCommande] = $envois;
            @file_put_contents($f, json_encode($suivi));
        }
        $this->repondre((bool) $ok, $ok
            ? 'C\'est envoyé ! Votre facture arrive dans quelques minutes à l\'adresse ' . $this->masquer($client->email) . '.'
            : 'L\'envoi a échoué. Téléchargez la facture avec l\'autre bouton, ou appelez-nous au 02 40 89 76 26.');
    }

    /** a***@gmail.com : on confirme l'adresse sans l'afficher en entier */
    private function masquer($email)
    {
        list($nom, $domaine) = explode('@', $email, 2);
        return Tools::substr($nom, 0, 1) . '***@' . $domaine;
    }

    private function repondre($ok, $msg)
    {
        echo json_encode(['ok' => $ok, 'message' => $msg]);
        exit;
    }
}
