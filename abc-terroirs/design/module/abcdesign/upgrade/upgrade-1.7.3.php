<?php
if (!defined('_PS_VERSION_')) {
    exit;
}

/** 1.7.3 : copie à la boutique du mail « Paiement accepté » (facture). */
function upgrade_module_1_7_3($module)
{
    return $module->registerHook('actionEmailSendBefore');
}
