<?php
/**
 * ABC Terroirs : habillage du site
 *
 * Ce module ajoute une feuille de style (views/css/abc-v178.css ; le numéro dans le nom force les navigateurs à recharger le style), les polices Google Fonts
 * et un petit script (views/js/abc.js) : raccourcis de navigation, boutons d'action,
 * aide quand une recherche ne trouve rien.
 * Pour revenir à l'ancien design : Modules > ce module > Désactiver.
 */
if (!defined('_PS_VERSION_')) {
    exit;
}

class Abcdesign extends Module
{
    public function __construct()
    {
        $this->name = 'abcdesign';
        $this->tab = 'front_office_features';
        $this->version = '1.7.8';
        $this->author = 'ABC Terroirs';
        $this->need_instance = 0;
        $this->ps_versions_compliancy = ['min' => '1.7.0.0', 'max' => _PS_VERSION_];
        $this->bootstrap = true;

        parent::__construct();

        $this->displayName = 'ABC Terroirs - Habillage du site';
        $this->description = 'Nouveau design, raccourcis de navigation et boutons d\'action. Désactiver ce module pour revenir à l\'ancien site.';
    }

    public function install()
    {
        return parent::install() && $this->registerHook('actionFrontControllerSetMedia')
            && $this->registerHook('actionEmailSendBefore');
    }

    /**
     * Copie cachée à la boutique du mail « Paiement accepté » envoyé au client (celui qui contient la facture PDF),
     * envoyée à l'adresse e-mail de la boutique (Paramètres de la boutique → Contact → Coordonnées).
     */
    public function hookActionEmailSendBefore($params)
    {
        if (!isset($params['template']) || $params['template'] !== 'payment') {
            return true;
        }
        $copie = Configuration::get('PS_SHOP_EMAIL');
        if (!Validate::isEmail($copie)) {
            return true;
        }
        $destinataires = is_array($params['to']) ? $params['to'] : [$params['to']];
        if (in_array($copie, $destinataires, true)) {
            return true;
        }
        $bcc = isset($params['bcc']) ? $params['bcc'] : null;
        if (empty($bcc)) {
            $params['bcc'] = $copie;
        } elseif (is_array($bcc)) {
            if (!in_array($copie, $bcc, true)) {
                $params['bcc'][] = $copie;
            }
        } elseif ($bcc !== $copie) {
            $params['bcc'] = [$bcc, $copie];
        }

        return true;
    }

    public function hookActionFrontControllerSetMedia()
    {
        if (!Configuration::get('ABCDESIGN_COPIE_FACTURE')) {
            $this->registerHook('actionEmailSendBefore');
            Configuration::updateValue('ABCDESIGN_COPIE_FACTURE', 1);
        }
        $this->context->controller->registerStylesheet(
            'abcdesign-fonts',
            'https://fonts.googleapis.com/css2?family=Libre+Caslon+Text:wght@400;700&family=Source+Sans+3:wght@400;600;700&display=swap',
            ['server' => 'remote', 'media' => 'all', 'priority' => 990]
        );
        $this->context->controller->registerStylesheet(
            'abcdesign',
            'modules/' . $this->name . '/views/css/abc-v178.css',
            ['media' => 'all', 'priority' => 1000]
        );
        $this->context->controller->registerJavascript(
            'abcdesign-js',
            'modules/' . $this->name . '/views/js/abc-v178.js',
            ['position' => 'bottom', 'priority' => 1000]
        );
    }
}
