# Chantio : mettre l'application en ligne

Chantio est un site simple : un dossier de fichiers (ce dossier) plus une base de données gratuite pour enregistrer les comptes, les devis et les factures. Compte environ 30 minutes, à faire de préférence sur un ordinateur.

Ce que tu vas créer :
1. une base de données chez **Supabase** (les comptes et les documents de chaque utilisateur) ;
2. le site, en déposant ce dossier chez un hébergeur gratuit (**Netlify**) ;
3. le raccourci sur l'écran d'accueil du téléphone.

> Ce dossier a été testé avec une fausse base de données pour vérifier le fonctionnement du site. Il n'a pas pu être testé avec un vrai projet Supabase : fais le test de l'étape 6 et dis-moi ce qui ne marche pas. Les noms de menus de Supabase et de Netlify peuvent avoir légèrement changé.

---

## Étape 1 : créer la base de données

1. Va sur **supabase.com** et crée un compte (bouton « Start your project »).
2. Clique sur **New project**. Nom : `chantio`. Choisis un mot de passe pour la base et **note-le**.
3. **Region** : choisis une région d'Europe (Paris si elle est proposée, sinon Francfort). C'est important, car les devis contiennent des données de clients.
4. Attends environ 2 minutes que le projet se crée.

## Étape 2 : créer la table (copier-coller)

1. Dans Supabase, ouvre **SQL Editor**, puis **New query**.
2. Ouvre le fichier `supabase.sql` de ce dossier, copie tout son contenu et colle-le dans la fenêtre.
3. Clique sur **Run**. Le message doit indiquer « Success ».

Ce script crée la table et les règles de sécurité : chaque utilisateur ne voit que ses propres données.

## Étape 3 : relier le site à la base

1. Dans Supabase : **Project Settings**, puis **API** (selon la version : « Data API » ou « API Keys »).
2. Repère deux valeurs : **Project URL** (elle ressemble à `https://abcdefgh.supabase.co`) et la clé **anon / public**.
3. Ouvre le fichier `config.js` avec un éditeur de texte (Bloc-notes, TextEdit) et colle les valeurs entre les guillemets.
4. Enregistre le fichier.

⚠️ Ne copie **jamais** la clé « service_role » : elle donne accès à toutes les données. La clé « anon » est faite pour être visible dans le site, la sécurité est assurée par les règles de l'étape 2.

## Étape 4 : régler la connexion

Dans Supabase :

1. **Authentication**, puis **Providers**, puis **Email**. Regarde l'option « Confirm email » :
   - *Activée* : chaque nouvel utilisateur doit cliquer sur un lien reçu par e-mail. C'est plus sûr, mais le service d'envoi d'e-mails par défaut de Supabase est limité (voir plus bas).
   - *Désactivée* : l'inscription est immédiate. Pratique pour démarrer et tester avec des amis.
2. **Authentication**, puis **URL Configuration** : tu rempliras « Site URL » à l'étape 5, quand tu connaîtras l'adresse du site.

## Étape 5 : publier le site

1. Va sur **netlify.com** et crée un compte gratuit.
2. Cherche l'option pour déployer **manuellement** en glissant un dossier (« Add new site », puis « Deploy manually », ou la page « Netlify Drop »).
3. Glisse **le contenu de ce dossier** (index.html, config.js, etc.). Assure-toi que `config.js` est bien celui que tu as rempli.
4. Netlify te donne une adresse du type `https://nom-au-hasard.netlify.app`. Tu peux la renommer dans les réglages du site, par exemple `chantio-wr.netlify.app`.
5. Retourne dans Supabase, **Authentication**, **URL Configuration**, et mets cette adresse dans **Site URL**. Ajoute-la aussi dans **Redirect URLs**.

Autres possibilités : Cloudflare Pages (envoi direct de dossier), ou un sous-domaine de ton site (par exemple `app.wr-couvreur-peintre.fr`) si ton hébergement permet de déposer des fichiers. Je ne sais pas si ton site Hostinger Horizons le permet.

## Étape 6 : tester

1. Ouvre l'adresse du site sur ton téléphone.
2. Touche « Pas encore de compte ? En créer un » et crée ton compte.
3. Dans **Réglages**, remplis ton entreprise (nom, SIRET, assurance décennale).
4. Crée un client, un devis, puis télécharge le PDF.
5. Ferme tout, rouvre le site : tes données doivent être toujours là.
6. Ouvre le site sur un autre appareil et connecte-toi : tu dois retrouver tes devis.

## Étape 7 : l'icône sur l'écran d'accueil

- **iPhone (Safari)** : ouvre le site, touche le bouton Partager (ou ≡ puis Partager), puis **Sur l'écran d'accueil**, puis **Ajouter**. L'icône orange de Chantio apparaît et l'application s'ouvre en plein écran.
- **Android (Chrome)** : menu ⋮, puis **Installer l'application** ou **Ajouter à l'écran d'accueil**.

Pour partager l'application, envoie simplement l'adresse du site. Chaque personne crée son compte et a son propre espace, invisible des autres.

---

## À savoir

- **Pause après une semaine** : sur l'offre gratuite de Supabase, un projet sans aucune activité pendant une semaine est mis en pause (il se réveille en quelques dizaines de secondes depuis le tableau de bord). Si l'application devient un outil de travail quotidien, l'offre payante évite ce problème.
- **Pas de sauvegarde automatique** sur l'offre gratuite. Utilise **Réglages, Compte, Exporter mes données** de temps en temps.
- **Limites gratuites** (au moment de la rédaction) : 500 Mo de base de données, 50 000 utilisateurs actifs par mois.
- **E-mails d'inscription** : le service d'e-mails par défaut de Supabase est pensé pour les tests. Si beaucoup de personnes s'inscrivent, ou si les e-mails n'arrivent pas, configure ton propre service d'envoi (« Custom SMTP » dans les réglages d'Authentication). Vérifie aussi les courriers indésirables.
- **Données des clients** : tes utilisateurs y enregistrent des données personnelles de leurs propres clients. Avant d'ouvrir l'application au public, prévois des mentions légales et une politique de confidentialité (RGPD). Je peux t'aider à les rédiger.
- **Mettre à jour le site** : quand je te donne une nouvelle version de `index.html`, remplace-la dans le dossier (en gardant ton `config.js` rempli) et dépose de nouveau le dossier sur Netlify. Les utilisateurs reçoivent la nouvelle version à leur prochaine ouverture.

## En cas de problème

| Ce que tu vois | Cause probable |
| --- | --- |
| « Cette application n'est pas encore reliée à sa base de données » | `config.js` est vide ou n'a pas été remplacé sur Netlify. |
| « Impossible de charger tes données » | L'étape 2 (script SQL) n'a pas été exécutée, ou l'URL / la clé est fausse. |
| « E-mail ou mot de passe incorrect » | Faute de frappe, ou compte pas encore confirmé par e-mail. |
| Le lien reçu par e-mail ouvre une page d'erreur | « Site URL » (étape 5, point 5) n'est pas l'adresse du site. |
| Le PDF ne se télécharge pas | Vérifie ta connexion internet et réessaie : la création du PDF utilise une bibliothèque chargée depuis internet. |

## Contenu du dossier

- `index.html` : l'application.
- `config.js` : les deux valeurs de ta base de données (à remplir).
- `supabase.sql` : le script à coller dans Supabase.
- `manifest.webmanifest`, `sw.js`, `icon*.png`, `apple-touch-icon.png`, `icon.svg` : l'icône et l'installation sur l'écran d'accueil.
