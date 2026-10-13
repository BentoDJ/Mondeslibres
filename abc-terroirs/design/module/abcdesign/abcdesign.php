<?php
/**
 * ABC Terroirs : habillage du site
 *
 * Ce module ajoute uniquement une feuille de style (views/css/abc.css) et les
 * polices Google Fonts sur toutes les pages de la boutique.
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
        $this->version = '1.0.0';
        $this->author = 'ABC Terroirs';
        $this->need_instance = 0;
        $this->ps_versions_compliancy = ['min' => '1.7.0.0', 'max' => _PS_VERSION_];
        $this->bootstrap = true;

        parent::__construct();

        $this->displayName = 'ABC Terroirs - Habillage du site';
        $this->description = 'Nouveau design (polices, couleurs, cartes produits, pied de page). Désactiver ce module pour revenir à l\'ancien design.';
    }

    public function install()
    {
        return parent::install() && $this->registerHook('actionFrontControllerSetMedia');
    }

    public function hookActionFrontControllerSetMedia()
    {
        $this->context->controller->registerStylesheet(
            'abcdesign-fonts',
            'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap',
            ['server' => 'remote', 'media' => 'all', 'priority' => 990]
        );
        $this->context->controller->registerStylesheet(
            'abcdesign',
            'modules/' . $this->name . '/views/css/abc.css',
            ['media' => 'all', 'priority' => 1000]
        );
    }
}
