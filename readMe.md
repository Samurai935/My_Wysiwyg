Module MyWysiwyg
Présentation

MyWysiwyg est un module JavaScript qui propose un éditeur WYSIWYG (What You See Is What You Get) simple et personnalisable pour votre site web. Ce module permet aux utilisateurs de formater facilement du texte, d'appliquer des styles et d'intégrer différents types de contenu.

Installation :

Pour utiliser le module MyWysiwyg dans votre projet, suivez ces étapes :

    Téléchargez le fichier my_wysiwyg.js.
    Incluez le script dans votre fichier HTML :

html

<script src="chemin/vers/script.js"></script>

    Initialisez l'éditeur en créant une instance de la classe MyWysiwyg :

javascript

import { MyWysiwyg } from "chemin/vers/my_wysiwyg.js";

const mw = new MyWysiwyg(document.querySelector("textarea"), {
buttons: ["gras", "italique", "youtube", "barré", "police"],
});

Configuration

Vous pouvez personnaliser l'éditeur en fournissant des options lors de l'initialisation. Les options par défaut comprennent un ensemble de boutons pour différentes options de formatage. Vous pouvez remplacer ces options selon vos besoins.

javascript

const optionsPersonnalisees = {
boutons: ["gras", "italique", "barré", "couleur", "police", "lien", "taille", "plus", "minus", "gauche", "centrer", "droite", "justifier", "enregistrer", "youtube", "dailymotion", "image"],
};

const myWysiwyg = new MyWysiwyg(containerEditeur, optionsPersonnalisees);

Utilisation

L'éditeur propose une barre d'outils avec différents boutons, chacun correspondant à une option de formatage spécifique. Les utilisateurs peuvent cliquer sur ces boutons pour appliquer des styles ou insérer du contenu.
Boutons disponibles

    gras : Bascule le texte en gras.
    italique : Bascule le texte en italique.
    barré : Bascule le texte barré.
    couleur : Change la couleur du texte (à venir).
    police : Change le style de police (à venir).
    lien : Insère un hyperlien (à venir).
    taille : Définit la taille de la police.
    plus : Augmente la taille de la police.
    minus : Diminue la taille de la police.
    gauche : Aligne le texte à gauche.
    centrer : Centre le texte.
    droite : Aligne le texte à droite.
    justifier : Justifie le texte (à venir).
    enregistrer : Enregistre le contenu (à venir).
    youtube : Intègre une vidéo YouTube.
    dailymotion : Intègre une vidéo Dailymotion (à venir).
    image : Insère une image (à venir).
