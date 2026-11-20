<?php
/**
 * Formulaire « Demande de devis » (page Pros → Demande de devis).
 * Reçoit la demande envoyée par le formulaire (views/js), l'envoie par e-mail à DEST
 * et la garde aussi dans data/devis.csv (dossier protégé), pour ne jamais perdre une demande.
 */
class AbcdesignDevisModuleFrontController extends ModuleFrontController
{
    const DEST = 'commercial@abcterroirs.com';

    public function init()
    {
        parent::init();
        header('Content-Type: application/json; charset=utf-8');
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->repondre(false, 'Méthode non autorisée.');
        }
        if (Tools::getValue('token') !== Tools::getToken(false)) {
            $this->repondre(false, 'La page a expiré : rechargez-la puis renvoyez votre demande.');
        }
        // anti-robots : champ caché qui doit rester vide, et au moins 3 secondes pour remplir
        if (Tools::getValue('site_web') !== '' || (time() - (int) Tools::getValue('t0')) < 3) {
            $this->repondre(true, 'ok');
        }

        $c = function ($k, $max = 200) { return trim(Tools::substr(strip_tags((string) Tools::getValue($k)), 0, $max)); };
        $d = [
            'projet' => $c('projet'), 'nombre' => (int) Tools::getValue('nombre'), 'budget' => $c('budget'),
            'date' => $c('date', 40), 'reception' => $c('reception'), 'preferences' => $c('preferences', 300),
            'entreprise' => $c('entreprise'), 'nom' => $c('nom'), 'email' => $c('email'), 'tel' => $c('tel', 40),
            'message' => $c('message', 3000),
        ];
        if ($d['nom'] === '' || !Validate::isEmail($d['email'])) {
            $this->repondre(false, 'Merci d\'indiquer votre nom et une adresse e-mail valide.');
        }
        if ($d['nombre'] < 1 || $d['nombre'] > 100000) {
            $this->repondre(false, 'Merci d\'indiquer le nombre de coffrets.');
        }

        // 1. sauvegarde (avant l'e-mail, pour ne rien perdre)
        $ligne = array_merge([date('Y-m-d H:i:s')], array_values($d));
        $f = _PS_MODULE_DIR_ . 'abcdesign/data/devis.csv';
        $nouveau = !file_exists($f);
        if ($h = @fopen($f, 'a')) {
            if ($nouveau) {
                fputcsv($h, ['date', 'projet', 'nombre', 'budget', 'date souhaitée', 'réception', 'préférences', 'entreprise', 'nom', 'email', 'téléphone', 'message'], ';');
            }
            fputcsv($h, $ligne, ';');
            fclose($h);
        }

        // 2. e-mail à l'équipe (réponse directe au client avec « Répondre »)
        $e = function ($v) { return htmlspecialchars((string) $v, ENT_QUOTES, 'UTF-8'); };
        $vars = [];
        foreach ($d as $k => $v) {
            $vars['{' . $k . '}'] = $v === '' ? '—' : $e($v);
        }
        $vars['{message}'] = $d['message'] === '' ? '—' : nl2br($e($d['message']));
        $sujet = 'Demande de devis : ' . ($d['entreprise'] !== '' ? $d['entreprise'] : $d['nom']) . ' (' . $d['nombre'] . ' coffrets)';
        $ok = Mail::Send(
            (int) $this->context->language->id, 'devis', $sujet, $vars, self::DEST, 'ABC Terroirs',
            null, null, null, null, _PS_MODULE_DIR_ . 'abcdesign/mails/', false, null, null, $d['email'], $d['nom']
        );
        $this->repondre((bool) $ok, $ok ? 'ok' : 'L\'envoi a échoué. Appelez-nous au 02 40 89 76 26 ou écrivez à ' . self::DEST . '.');
    }

    private function repondre($ok, $msg)
    {
        echo json_encode(['ok' => $ok, 'message' => $msg]);
        exit;
    }
}
