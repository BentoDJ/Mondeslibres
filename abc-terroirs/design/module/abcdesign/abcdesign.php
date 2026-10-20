<?php
/**
 * ABC Terroirs : habillage du site
 *
 * Ce module ajoute une feuille de style (views/css/abc-v170.css ; le numéro dans le nom force les navigateurs à recharger le style), les polices Google Fonts
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
        $this->version = '1.7.0';
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
        return parent::install() && $this->registerHook('actionFrontControllerSetMedia');
    }

    public function hookActionFrontControllerSetMedia()
    {
        $this->context->controller->registerStylesheet(
            'abcdesign-fonts',
            'https://fonts.googleapis.com/css2?family=Libre+Caslon+Text:wght@400;700&family=Source+Sans+3:wght@400;600;700&display=swap',
            ['server' => 'remote', 'media' => 'all', 'priority' => 990]
        );
        $this->context->controller->registerStylesheet(
            'abcdesign',
            'modules/' . $this->name . '/views/css/abc-v170.css',
            ['media' => 'all', 'priority' => 1000]
        );
        $this->context->controller->registerJavascript(
            'abcdesign-js',
            'modules/' . $this->name . '/views/js/abc-v170.js',
            ['position' => 'bottom', 'priority' => 1000]
        );
    }
}
