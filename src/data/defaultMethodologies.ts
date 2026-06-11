/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Folder, Methodology } from '../types';

export const DEFAULT_FOLDERS: Folder[] = [
  {
    id: 'beschwerde',
    nameAr: 'شكاوى (Beschwerde)',
    nameDe: 'Beschwerde',
    color: 'from-rose-500 to-red-650',
  },
];

export const DEFAULT_METHODOLOGIES: Methodology[] = [
  // ================= 21 COMPLAINT TOPICS (TELC B2 BESCHWERDEN) =================

  {
    id: 'telc-b2-01-matratze',
    folderId: 'beschwerde',
    title: '1. شكوى بخصوص مرتبة السرير (Matratze - Baumeister-Betten)',
    content: `Max Mustermann
Musterstraße 12
12345 Musterstadt

Musterstadt, den 11.06.2026

Firma Baumeister-Betten GmbH
Industriestraße 45
54321 Berlin

Betreff: Beschwerde über die Matratze von Baumeister-Betten

Sehr geehrte Damen und Herren,

Durch Ihre Anzeige wurde ich auf Ihr Angebot aufmerksam. Da Ihr Angebot einen guten Eindruck machte, entschied ich mich dafür. Leider musste ich feststellen, dass die Realität nicht Ihren Angaben entsprach. Deshalb sehe ich mich veranlasst, Ihnen diese Beschwerde zu schreiben.

Zunächst möchte ich erwähnen, dass die gelieferte Komfort-Matratze extrem hart ist und überhaupt nicht dem versprochenen Schlafgefühl entspricht. Außerdem muss ich darauf hinweisen, dass die Lieferung statt der versprochenen zwei Werktage über drei Wochen gedauert hat. Darüber hinaus war ich besonders enttäuscht darüber, dass der Lieferfahrer sich weigerte, meine alte Matratze mitzunehmen, obwohl ich dafür extra bezahlt hatte.

Aus diesem Grund erwarte ich eine angemessene Entschädigung beziehungsweise eine Stellungnahme Ihrerseits. Ich hoffe, dass Sie meine Beschwerde ernst nehmen und entsprechende Maßnahmen ergreifen. Ich sehe Ihrer baldigen Antwort mit Erwartung entgegen.

Mit freundlichen Grüßen,
Max Mustermann`,
    mastery: 0,
    createdAt: 1718010000101,
  },

  {
    id: 'telc-b2-02-kaese',
    folderId: 'beschwerde',
    title: '2. شكوى بخصوص جبنة ذائبة ملوثة (Schmelzkäse Alpengeschmack)',
    content: `Max Mustermann
Musterstraße 12
12345 Musterstadt

Musterstadt, den 11.06.2026

Firma Molkerei Alpengeschmack GmbH
Lindauer Straße 5
87437 Kempten

Betreff: Beschwerde über den Schmelzkäse Alpengeschmack

Sehr geehrte Damen und Herren,

Durch Ihre Anzeige wurde ich auf Ihr Angebot aufmerksam. Da Ihr Angebot einen guten Eindruck machte, entschied ich mich dafür. Leider musste ich feststellen, dass die Realität nicht Ihren Angaben entsprach. Deshalb sehe ich mich veranlasst, Ihnen diese Beschwerde zu schreiben.

Zunächst möchte ich erwähnen, dass ich den Käse für ein Familienfrühstück verwenden wollte, da Ihre Werbung absolute Frische verspricht. Außerdem muss ich darauf hinweisen, dass alle Familienmitglieder nach dem Verzehr des Käses unter starken Magenschmerzen litten. Darüber hinaus war ich besonders enttäuscht darüber, dass ich im Käse kleine, gefährliche Plastikstücke gefunden habe, die ein hohes Gesundheitsrisiko darstellen.

Aus diesem Grund erwarte ich eine angemessene Entschädigung beziehungsweise eine Stellungnahme Ihrerseits. Ich hoffe, dass Sie meine Beschwerde ernst nehmen und entsprechende Maßnahmen ergreifen. Ich sehe Ihrer baldigen Antwort mit Erwartung entgegen.

Mit freundlichen Grüßen,
Max Mustermann`,
    mastery: 0,
    createdAt: 1718010000102,
  },

  {
    id: 'telc-b2-03-obstkiste',
    folderId: 'beschwerde',
    title: '3. شكوى بخصوص صندوق الفواكه والخضار (Meine Kiste Abo)',
    content: `Max Mustermann
Musterstraße 12
12345 Musterstadt

Musterstadt, den 11.06.2026

Firma Meine Kiste GmbH
Gemüsestraße 7
20095 Hamburg

Betreff: Beschwerde über das Abonnement Meine Kiste

Sehr geehrte Damen und Herren,

Durch Ihre Anzeige wurde ich auf Ihr Angebot aufmerksam. Da Ihr Angebot einen guten Eindruck machte, entschied ich mich dafür. Leider musste ich feststellen, dass die Realität nicht Ihren Angaben entsprach. Deshalb sehe ich mich veranlasst, Ihnen diese Beschwerde zu schreiben.

Zunächst möchte ich erwähnen, dass ich mich für Ihr Obstabo entschieden habe, um frische, regionale Bio-Produkte zu erhalten. Außerdem muss ich darauf hinweisen, dass fast die Hälfte des gelieferten Gemüses bereits faul und ungenießbar war. Darüber hinaus war ich besonders enttäuscht darüber, dass die Lieferung mehrmals verspätet ankam und die Kisten stark verschmutzt waren.

Aus diesem Grund erwarte ich eine angemessene Entschädigung beziehungsweise eine Stellungnahme Ihrerseits. Ich hoffe, dass Sie meine Beschwerde ernst nehmen und entsprechende Maßnahmen ergreifen. Ich sehe Ihrer baldigen Antwort mit Erwartung entgegen.

Mit freundlichen Grüßen,
Max Mustermann`,
    mastery: 0,
    createdAt: 1718010000103,
  },

  {
    id: 'telc-b2-04-apps',
    folderId: 'beschwerde',
    title: '4. شكوى بخصوص تطبيقات هاتف مدفوعة (Kostenlose Apps - prima-app)',
    content: `Max Mustermann
Musterstraße 12
12345 Musterstadt

Musterstadt, den 11.06.2026

Firma prima-app GmbH
Sommerweg 34
37269 Eschwege

Betreff: Beschwerde über das Abonnement von prima-app.net

Sehr geehrte Damen und Herren,

Durch Ihre Anzeige wurde ich auf Ihr Angebot aufmerksam. Da Ihr Angebot einen guten Eindruck machte, entschied ich mich dafür. Leider musste ich feststellen, dass die Realität nicht Ihren Angaben entsprach. Deshalb sehe ich mich veranlasst, Ihnen diese Beschwerde zu schreiben.

Zunächst möchte ich erwähnen, dass ich die angeblich kostenlosen Spiele-Apps für mein Smartphone nutzen wollte. Außerdem muss ich darauf hinweisen, dass mir trotz des Versprechens kostenloser Dienste sofort ein hoher Monatsbeitrag abgebucht wurde. Darüber hinaus war ich besonders enttäuscht darüber, dass die meisten Apps ständig abstürzen und überhaupt nicht funktionieren.

Aus diesem Grund erwarte ich eine angemessene Entschädigung beziehungsweise eine Stellungnahme Ihrerseits. Ich hoffe, dass Sie meine Beschwerde ernst nehmen und entsprechende Maßnahmen ergreifen. Ich sehe Ihrer baldigen Antwort mit Erwartung entgegen.

Mit freundlichen Grüßen,
Max Mustermann`,
    mastery: 0,
    createdAt: 1718010000104,
  },

  {
    id: 'telc-b2-05-staubsauger',
    folderId: 'beschwerde',
    title: '5. شكوى بخصوص مكنسة روبوت ذكية (Staubsaugroboter SuperClean)',
    content: `Max Mustermann
Musterstraße 12
12345 Musterstadt

Musterstadt, den 11.06.2026

SuperClean-Staubsaugroboter GmbH
Adenauerstraße 12
50600 Köln

Betreff: Beschwerde über den SuperClean-Staubsaugroboter

Sehr geehrte Damen und Herren,

Durch Ihre Anzeige wurde ich auf Ihr Angebot aufmerksam. Da Ihr Angebot einen guten Eindruck machte, entschied ich mich dafür. Leider musste ich feststellen, dass die Realität nicht Ihren Angaben entsprach. Deshalb sehe ich mich veranlasst, Ihnen diese Beschwerde zu schreiben.

Zunächst möchte ich erwähnen, dass ich diesen Roboter kaufte, um Zeit im Haushalt zu sparen, da er laut Anzeige leise arbeitet. Außerdem muss ich darauf hinweisen, dass das Gerät extrem laut ist und ständig heftig gegen meine wertvollen Möbel stößt. Darüber hinaus war ich besonders enttäuscht darüber, dass die App-Steuerung im Alltag überhaupt keine Verbindung zum Gerät herstellen kann.

Aus diesem Grund erwarte ich eine angemessene Entschädigung beziehungsweise eine Stellungnahme Ihrerseits. Ich hoffe, dass Sie meine Beschwerde ernst nehmen und entsprechende Maßnahmen ergreifen. Ich sehe Ihrer baldigen Antwort mit Erwartung entgegen.

Mit freundlichen Grüßen,
Max Mustermann`,
    mastery: 0,
    createdAt: 1718010000105,
  },

  {
    id: 'telc-b2-06-hoteltherme',
    folderId: 'beschwerde',
    title: '6. شكوى بخصوص فندق وقاعة علاجية (Hotel mit Thermen)',
    content: `Max Mustermann
Musterstraße 12
12345 Musterstadt

Musterstadt, den 11.06.2026

Hotel an der Therme
Thermenallee 5
61352 Bad Homburg

Betreff: Beschwerde über den Aufenthalt im Hotel an der Therme

Sehr geehrte Damen und Herren,

Durch Ihre Anzeige wurde ich auf Ihr Angebot aufmerksam. Da Ihr Angebot einen guten Eindruck machte, entschied ich mich dafür. Leider musste ich feststellen, dass die Realität nicht Ihren Angaben entsprach. Deshalb sehe ich mich veranlasst, Ihnen diese Beschwerde zu schreiben.

Zunächst möchte ich erwähnen, dass ich mich auf ein erholsames Wochenende mit einem wunderschönen Blick in die Natur gefreut hatte. Außerdem muss ich darauf hinweisen, dass mein Zimmer keinen Balkon hatte und direkt über einer lauten Hauptstraße lag. Darüber hinaus war ich besonders enttäuscht darüber, dass das Wasser der Therme eiskalt war und die Saunalandschaft schmutzig wirkte.

Aus diesem Grund erwarte ich eine angemessene Entschädigung beziehungsweise eine Stellungnahme Ihrerseits. Ich hoffe, dass Sie meine Beschwerde ernst nehmen und entsprechende Maßnahmen ergreifen. Ich sehe Ihrer baldigen Antwort mit Erwartung entgegen.

Mit freundlichen Grüßen,
Max Mustermann`,
    mastery: 0,
    createdAt: 1718010000106,
  },

  {
    id: 'telc-b2-07-reisebuero',
    folderId: 'beschwerde',
    title: '7. شكوى بخصوص حجز رحلة سياحية متكاملة (Reisebüro Sonnenschein)',
    content: `Max Mustermann
Musterstraße 12
12345 Musterstadt

Musterstadt, den 11.06.2026

Reisebüro Sonnenschein
Käfergasse 5
01109 Dresden

Betreff: Beschwerde über die Pauschalreise von Reisebüro Sonnenschein

Sehr geehrte Damen und Herren,

Durch Ihre Anzeige wurde ich auf Ihr Angebot aufmerksam. Da Ihr Angebot einen guten Eindruck machte, entschied ich mich dafür. Leider musste ich feststellen, dass die Realität nicht Ihren Angaben entsprach. Deshalb sehe ich mich veranlasst, Ihnen diese Beschwerde zu schreiben.

Zunächst möchte ich erwähnen, dass ich eine voll organisierte Pauschalreise gebucht hatte, um mich im Urlaub um nichts kümmern zu müssen. Außerdem muss ich darauf hinweisen, dass es bei unserer Ankunft am späten Abend kein freies Zimmer für uns im Hotel gab. Darüber hinaus war ich besonders enttäuscht darüber, dass der Reiseleiter vor Ort sehr unhöflich war und uns überhaupt nicht helfen wollte.

Aus diesem Grund erwarte ich eine angemessene Entschädigung beziehungsweise eine Stellungnahme Ihrerseits. Ich hoffe, dass Sie meine Beschwerde ernst nehmen und entsprechende Maßnahmen ergreifen. Ich sehe Ihrer baldigen Antwort mit Erwartung entgegen.

Mit freundlichen Grüßen,
Max Mustermann`,
    mastery: 0,
    createdAt: 1718010000107,
  },

  {
    id: 'telc-b2-08-kursschulung',
    folderId: 'beschwerde',
    title: '8. شكوى بخصوص دورة تدريبية مهنية (Schulung - Kursbeschreibung)',
    content: `Max Mustermann
Musterstraße 12
12345 Musterstadt

Musterstadt, den 11.06.2026

Seminarzentrum KarrierePlus
Hauptstraße 10
80331 München

Betreff: Beschwerde über den zweitägigen Fortbildungskurs

Sehr geehrte Damen und Herren,

Durch Ihre Anzeige wurde ich auf Ihr Angebot aufmerksam. Da Ihr Angebot einen guten Eindruck machte, entschied ich mich dafür. Leider musste ich feststellen, dass die Realität nicht Ihren Angaben entsprach. Deshalb sehe ich mich veranlasst, Ihnen diese Beschwerde zu schreiben.

Zunächst möchte ich erwähnen, dass ich an diesem teuren Seminar teilgenommen habe, um mich professionell präsentieren zu lernen. Außerdem muss ich darauf hinweisen, dass der Dozent völlig unvorbereitet war und am ersten Tag nur veraltete Folien vorgelesen hat. Darüber hinaus war ich besonders enttäuscht darüber, dass das versprochene Praktikum am zweiten Tag wegen schlechter Organisation komplett ausfiel.

Aus diesem Grund erwarte ich eine angemessene Entschädigung beziehungsweise eine Stellungnahme Ihrerseits. Ich hoffe, dass Sie meine Beschwerde ernst nehmen und entsprechende Maßnahmen ergreifen. Ich sehe Ihrer baldigen Antwort mit Erwartung entgegen.

Mit freundlichen Grüßen,
Max Mustermann`,
    mastery: 0,
    createdAt: 1718010000108,
  },

  {
    id: 'telc-b2-09-wohndesign',
    folderId: 'beschwerde',
    title: '9. شكوى بخصوص ورشة عمل التصميم والديكور (Modernes Wohndesign)',
    content: `Max Mustermann
Musterstraße 12
12345 Musterstadt

Musterstadt, den 11.06.2026

Gestaltungsakademie Braunsbach
Kirchweg 8
74542 Braunsbach

Betreff: Beschwerde über den Workshop Modernes Wohndesign

Sehr geehrte Damen und Herren,

Durch Ihre Anzeige wurde ich auf Ihr Angebot aufmerksam. Da Ihr Angebot einen guten Eindruck machte, entschied ich mich dafür. Leider musste ich feststellen, dass die Realität nicht Ihren Angaben entsprach. Deshalb sehe ich mich veranlasst, Ihnen diese Beschwerde zu schreiben.

Zunächst möchte ich erwähnen, dass ich an diesem Workshop teilgenommen habe, um meine Wohnung nach aktuellen Tendenzen zu gestalten. Außerdem muss ich darauf hinweisen, dass der Kurs mit über zwei Stunden Verspätung begann und die Kursleiterin sehr ungeduldig war. Darüber hinaus war ich besonders enttäuscht darüber, dass wichtige angekündigte Themen wie die harmonische Beleuchtung komplett ignoriert wurden.

Aus diesem Grund erwarte ich eine angemessene Entschädigung beziehungsweise eine Stellungnahme Ihrerseits. Ich hoffe, dass Sie meine Beschwerde ernst nehmen und entsprechende Maßnahmen ergreifen. Ich sehe Ihrer baldigen Antwort mit Erwartung entgegen.

Mit freundlichen Grüßen,
Max Mustermann`,
    mastery: 0,
    createdAt: 1718010000109,
  },

  {
    id: 'telc-b2-10-renovierung',
    folderId: 'beschwerde',
    title: '10. شكوى بخصوص دورة أعمال ترميم (Renovierungskurs)',
    content: `Max Mustermann
Musterstraße 12
12345 Musterstadt

Musterstadt, den 11.06.2026

Urbi-Baumarkt GmbH
Industriestraße 12
56478 Montabaur

Betreff: Beschwerde über den Renovierungskurs am Wochenende

Sehr geehrte Damen und Herren,

Durch Ihre Anzeige wurde ich auf Ihr Angebot aufmerksam. Da Ihr Angebot einen guten Eindruck machte, entschied ich mich dafür. Leider musste ich feststellen, dass die Realität nicht Ihren Angaben entsprach. Deshalb sehe ich mich veranlasst, Ihnen diese Beschwerde zu schreiben.

Zunächst möchte ich erwähnen, dass ich diesen Wochenendkurs gewählt habe, um das Tapezieren und Streichen praktisch zu erlernen. Außerdem muss ich darauf hinweisen, dass statt der maximal 10 Teilnehmer über 25 Personen anwesend waren, weshalb es viel zu eng war. Darüber hinaus war ich besonders enttäuscht darüber, dass es nicht genügend Werkzeuge und Materialien für die praktischen Übungen gab.

Aus diesem Grund erwarte ich eine angemessene Entschädigung beziehungsweise eine Stellungnahme Ihrerseits. Ich hoffe, dass Sie meine Beschwerde ernst nehmen und entsprechende Maßnahmen ergreifen. Ich sehe Ihrer baldigen Antwort mit Erwartung entgegen.

Mit freundlichen Grüßen,
Max Mustermann`,
    mastery: 0,
    createdAt: 1718010000110,
  },

  {
    id: 'telc-b2-11-engagement',
    folderId: 'beschwerde',
    title: '11. شكوى بخصوص تنظيم عمل تطوعي (Bilderpaten für Jugendliche)',
    content: `Max Mustermann
Musterstraße 12
12345 Musterstadt

Musterstadt, den 11.06.2026

Bildungspaten für Jugendliche e. V.
Hamburger Str. 112
60824 Frankfurt am Main

Betreff: Beschwerde über die Organisation des Vereins Bildungspaten

Sehr geehrte Damen und Herren,

Durch Ihre Anzeige wurde ich auf Ihr Angebot aufmerksam. Da Ihr Angebot einen guten Eindruck machte, entschied ich mich dafür. Leider musste ich feststellen, dass die Realität nicht Ihren Angaben entsprach. Deshalb sehe ich mich veranlasst, Ihnen diese Beschwerde zu schreiben.

Zunächst möchte ich erwähnen, dass ich Schülern ehrenamtlich beim Übergang zwischen Schule und Beruf aktiv helfen wollte. Außerdem muss ich darauf hinweisen, dass die versprochenen drei Vorbereitungsseminare kurzfristig und ersatzlos abgesagt wurden. Darüber hinaus war ich besonders enttäuscht darüber, dass wir vom Team des Vereins keinerlei Unterstützung bei unserer Arbeit erhielten.

Aus diesem Grund erwarte ich eine angemessene Entschädigung beziehungsweise eine Stellungnahme Ihrerseits. Ich hoffe, dass Sie meine Beschwerde ernst nehmen und entsprechende Maßnahmen ergreifen. Ich sehe Ihrer baldigen Antwort mit Erwartung entgegen.

Mit freundlichen Grüßen,
Max Mustermann`,
    mastery: 0,
    createdAt: 1718010000111,
  },

  {
    id: 'telc-b2-12-apartmenthaus',
    folderId: 'beschwerde',
    title: '12. شكوى بخصوص شقة سكنية مؤقتة (Apartmenthaus Oranienburg)',
    content: `Max Mustermann
Musterstraße 12
12345 Musterstadt

Musterstadt, den 11.06.2026

Apartmenthaus Oranienburg
Isoldenweg 19
16125 Oranienburg

Betreff: Beschwerde über die Wohnung im Apartmenthaus Oranienburg

Sehr geehrte Damen und Herren,

Durch Ihre Anzeige wurde ich auf Ihr Angebot aufmerksam. Da Ihr Angebot einen guten Eindruck machte, entschied ich mich dafür. Leider musste ich feststellen, dass die Realität nicht Ihren Angaben entsprach. Deshalb sehe ich mich veranlasst, Ihnen diese Beschwerde zu schreiben.

Zunächst möchte ich erwähnen, dass ich für ein dringendes berufliches Projekt für drei Monate nach Oranienburg ziehen musste. Außerdem muss ich darauf hinweisen, dass die Wohnung bei meiner Ankunft nicht gereinigt war und wichtige Möbelstücke sowie Bettwäsche fehlten. Darüber hinaus war ich besonders enttäuscht darüber, dass die Heizung komplett defekt war und wir tagelang kein warmes Wasser hatten.

Aus diesem Grund erwarte ich eine angemessene Entschädigung beziehungsweise eine Stellungnahme Ihrerseits. Ich hoffe, dass Sie meine Beschwerde ernst nehmen und entsprechende Maßnahmen ergreifen. Ich sehe Ihrer baldigen Antwort mit Erwartung entgegen.

Mit freundlichen Grüßen,
Max Mustermann`,
    mastery: 0,
    createdAt: 1718010000112,
  },

  {
    id: 'telc-b2-13-autovermietung',
    folderId: 'beschwerde',
    title: '13. شكوى بخصوص خدمة استئجار سيارة (Autovermietung Neustadt)',
    content: `Max Mustermann
Musterstraße 12
12345 Musterstadt

Musterstadt, den 11.06.2026

Autovermietung Neustadt GmbH
Bahnhofstraße 22
53111 Bonn

Betreff: Beschwerde über das gemietete Fahrzeug von Autovermietung Neustadt

Sehr geehrte Damen und Herren,

Durch Ihre Anzeige wurde ich auf Ihr Angebot aufmerksam. Da Ihr Angebot einen guten Eindruck machte, entschied ich mich dafür. Leider musste ich feststellen, dass die Realität nicht Ihren Angaben entsprach. Deshalb sehe ich mich veranlasst, Ihnen diese Beschwerde zu schreiben.

Zunächst möchte ich erwähnen, dass ich für ein wichtiges Geschäftswochenende ein modernes und zuverlässiges Auto gemietet hatte. Außerdem muss ich darauf hinweisen, dass das gelieferte Fahrzeug innen extrem schmutzig war und der Motor unruhige Geräusche machte. Darüber hinaus war ich besonders enttäuscht darüber, dass der Kundenservice trotz einer garantierten Erreichbarkeit rund um die Uhr besetzt war.

Aus diesem Grund erwarte ich eine angemessene Entschädigung beziehungsweise eine Stellungnahme Ihrerseits. Ich hoffe, dass Sie meine Beschwerde ernst nehmen und entsprechende Maßnahmen ergreifen. Ich sehe Ihrer baldigen Antwort mit Erwartung entgegen.

Mit freundlichen Grüßen,
Max Mustermann`,
    mastery: 0,
    createdAt: 1718010000113,
  },

  {
    id: 'telc-b2-14-freizeitverein',
    folderId: 'beschwerde',
    title: '14. شكوى بخصوص أنشطة نادي ترفيهي (Freizeitverein)',
    content: `Max Mustermann
Musterstraße 12
12345 Musterstadt

Musterstadt, den 11.06.2026

Freizeitverein Mainz e. V.
Rheinufer 15
55116 Mainz

Betreff: Beschwerde über das Angebot des Freizeitvereins

Sehr geehrte Damen und Herren,

Durch Ihre Anzeige wurde ich auf Ihr Angebot aufmerksam. Da Ihr Angebot einen guten Eindruck machte, entschied ich mich dafür. Leider musste ich feststellen, dass die Realität nicht Ihren Angaben entsprach. Deshalb sehe ich mich veranlasst, Ihnen diese Beschwerde zu schreiben.

Zunächst möchte ich erwähnen, dass ich dem Verein beigetreten bin, um neue Menschen kennenzulernen und gemeinsam Ausflüge zu machen. Außerdem muss ich darauf hinweisen, dass in den letzten zwei Wochen fast alle angekündigten Spiele- und Kinoabende ausgefallen sind. Darüber hinaus war ich besonders enttäuscht darüber, dass trotz des reduzierten Programms der volle Mitgliedsbeitrag abgebucht wurde.

Aus diesem Grund erwarte ich eine angemessene Entschädigung beziehungsweise eine Stellungnahme Ihrerseits. Ich hoffe, dass Sie meine Beschwerde ernst nehmen und entsprechende Maßnahmen ergreifen. Ich sehe Ihrer baldigen Antwort mit Erwartung entgegen.

Mit freundlichen Grüßen,
Max Mustermann`,
    mastery: 0,
    createdAt: 1718010000114,
  },

  {
    id: 'telc-b2-15-naturmuseum',
    folderId: 'beschwerde',
    title: '15. شكوى بخصوص زيارة متحف الطبيعة (Naturmuseum)',
    content: `Max Mustermann
Musterstraße 12
12345 Musterstadt

Musterstadt, den 11.06.2026

Naturmuseum Deutschland
Museumsinsel 3
10178 Berlin

Betreff: Beschwerde über die Führung im Naturmuseum

Sehr geehrte Damen und Herren,

Durch Ihre Anzeige wurde ich auf Ihr Angebot aufmerksam. Da Ihr Angebot einen guten Eindruck machte, entschied ich mich dafür. Leider musste ich feststellen, dass die Realität nicht Ihren Angaben entsprach. Deshalb sehe ich mich veranlasst, Ihnen diese Beschwerde zu schreiben.

Zunächst möchte ich erwähnen, dass ich das Museum zusammen mit meinen Kollegen aus dem Sprachkurs besuchen wollte, um viel zu lernen. Außerdem muss ich darauf hinweisen, dass die bestellten Audio-Guides defekt waren und wir keinerlei Erklärungen anhören konnten. Darüber hinaus war ich besonders enttäuscht darüber, dass viele Ausstellungsbereiche wegen mangelhafter Organisation gesperrt blieben.

Aus diesem Grund erwarte ich eine angemessene Entschädigung beziehungsweise eine Stellungnahme Ihrerseits. Ich hoffe, dass Sie meine Beschwerde ernst nehmen und entsprechende Maßnahmen ergreifen. Ich sehe Ihrer baldigen Antwort mit Erwartung entgegen.

Mit freundlichen Grüßen,
Max Mustermann`,
    mastery: 0,
    createdAt: 1718010000115,
  },

  {
    id: 'telc-b2-16-musical',
    folderId: 'beschwerde',
    title: '16. شكوى بخصوص جولة كواليس مسرحية (Backstage-Musical-Tour)',
    content: `Max Mustermann
Musterstraße 12
12345 Musterstadt

Musterstadt, den 11.06.2026

Stage Entertainment GmbH
Musicalallee 1
20359 Hamburg

Betreff: Beschwerde über die Backstage-Musical-Tour

Sehr geehrte Damen und Herren,

Durch Ihre Anzeige wurde ich auf Ihr Angebot aufmerksam. Da Ihr Angebot einen guten Eindruck machte, entschied ich mich dafür. Leider musste ich feststellen, dass die Realität nicht Ihren Angaben entsprach. Deshalb sehe ich mich veranlasst, Ihnen diese Beschwerde zu schreiben.

Zunächst möchte ich erwähnen, dass ich einen detaillierten Blick hinter die Kulissen werfen wollte, um den Ablauf eines Musicals zu verstehen. Außerdem muss ich darauf hinweisen, dass die Führung statt der versprochenen drei Stunden bereits nach dreißig Minuten beendet wurde. Darüber hinaus war ich besonders enttäuscht darüber, dass wir keinen einzigen Darsteller trafen und das Kostüm-Archiv verschlossen war.

Aus diesem Grund erwarte ich eine angemessene Entschädigung beziehungsweise eine Stellungnahme Ihrerseits. Ich hoffe, dass Sie meine Beschwerde ernst nehmen und entsprechende Maßnahmen ergreifen. Ich sehe Ihrer baldigen Antwort mit Erwartung entgegen.

Mit freundlichen Grüßen,
Max Mustermann`,
    mastery: 0,
    createdAt: 1718010000116,
  },

  {
    id: 'telc-b2-17-kultur',
    folderId: 'beschwerde',
    title: '17. شكوى بخصوص جولة ثقافية وغذائية (Kultur und Kulinarik)',
    content: `Max Mustermann
Musterstraße 12
12345 Musterstadt

Musterstadt, den 11.06.2026

Gute-Laune-Reisen GmbH
Vulkanstraße 4
10315 Berlin

Betreff: Beschwerde über den Tagesausflug von Gute-Laune-Reisen

Sehr geehrte Damen und Herren,

Durch Ihre Anzeige wurde ich auf Ihr Angebot aufmerksam. Da Ihr Angebot einen guten Eindruck machte, entschied ich mich dafür. Leider musste ich feststellen, dass die Realität nicht Ihren Angaben entsprach. Deshalb sehe ich mich veranlasst, Ihnen diese Beschwerde zu schreiben.

Zunächst möchte ich erwähnen, dass ich an diesem Ausflug teilgenommen habe, um einen entspannten Tag in angenemmer Gesellschaft zu verbringen. Außerdem muss ich darauf hinweisen, dass das versprochene traditionelle Mittagessen aus kalten, unappetitlichen Essensresten bestand. Darüber hinaus war ich besonders enttäuscht darüber, dass uns am Besichtigungsort unaufgefordert minderwertige Waren aufgedrängt wurden.

Aus diesem Grund erwarte ich eine angemessene Entschädigung beziehungsweise eine Stellungnahme Ihrerseits. Ich hoffe, dass Sie meine Beschwerde ernst nehmen und entsprechende Maßnahmen ergreifen. Ich sehe Ihrer baldigen Antwort mit Erwartung entgegen.

Mit freundlichen Grüßen,
Max Mustermann`,
    mastery: 0,
    createdAt: 1718010000117,
  },

  {
    id: 'telc-b2-18-fahrradtour',
    folderId: 'beschwerde',
    title: '18. شكوى بخصوص جولة ركوب الدراجات (Fahrradtour - Radle dich munter)',
    content: `Max Mustermann
Musterstraße 12
12345 Musterstadt

Musterstadt, den 11.06.2026

Radle dich munter e. V.
Heidewiese 1
44777 Heimatstadt

Betreff: Beschwerde an den Verein Radle dich munter

Sehr geehrte Damen und Herren,

Durch Ihre Anzeige wurde ich auf Ihr Angebot aufmerksam. Da Ihr Angebot einen guten Eindruck machte, entschied ich mich dafür. Leider musste ich feststellen, dass die Realität nicht Ihren Angaben entsprach. Deshalb sehe ich mich veranlasst, Ihnen diese Beschwerde zu schreiben.

Zunächst möchte ich erwähnen, dass mich Ihr Angebot „Radeln mit Spaß" ansprach, um mich am Wochenende sportlich zu betätigen. Außerdem muss ich darauf hinweisen, dass das mir zur Verfügung gestellte Leihrad eine defekte Bremse hatte, was lebensgefährlich war. Darüber hinaus war ich besonders enttäuscht darüber, dass der Trainer auf meine Fragen sehr unhöflich reagierte und uns ignorierte.

Aus diesem Grund erwarte ich eine angemessene Entschädigung beziehungsweise eine Stellungnahme Ihrerseits. Ich hoffe, dass Sie meine Beschwerde ernst nehmen und entsprechende Maßnahmen ergreifen. Ich sehe Ihrer baldigen Antwort mit Erwartung entgegen.

Mit freundlichen Grüßen,
Max Mustermann`,
    mastery: 0,
    createdAt: 1718010000118,
  },

  {
    id: 'telc-b2-19-sprachkurs',
    folderId: 'beschwerde',
    title: '19. شكوى بخصوص دورة تحضير امتحان اللغة (Sprachkurs - TELC B2)',
    content: `Max Mustermann
Musterstraße 12
12345 Musterstadt

Musterstadt, den 11.06.2026

Deutsch-Lernzentrum GmbH
Lindenallee 12
60311 Frankfurt am Main

Betreff: Beschwerde über den TELC B2 Vorbereitungskurs

Sehr geehrte Damen und Herren,

Durch Ihre Anzeige wurde ich auf Ihr Angebot aufmerksam. Da Ihr Angebot einen guten Eindruck machte, entschied ich mich dafür. Leider musste ich feststellen, dass die Realität nicht Ihren Angaben entsprach. Deshalb sehe ich mich veranlasst, Ihnen diese Beschwerde zu schreiben.

Zunächst möchte ich erwähnen, dass ich diesen Intensivkurs gebucht habe, um mich gezielt auf die TELC B2-Prüfung vorzubereiten. Außerdem muss ich darauf hinweisen, dass der Unterricht ständig ausfiel und wir fast keine schriftlichen Übungen korrigiert bekommen haben. Darüber hinaus war ich besonders enttäuscht darüber, dass die Sprachlehrerin kaum fehlerfreies Deutsch sprach und didaktisch ungeschult war.

Aus diesem Grund erwarte ich eine angemessene Entschädigung beziehungsweise eine Stellungnahme Ihrerseits. Ich hoffe, dass Sie meine Beschwerde ernst nehmen und entsprechende Maßnahmen ergreifen. Ich sehe Ihrer baldigen Antwort mit Erwartung entgegen.

Mit freundlichen Grüßen,
Max Mustermann`,
    mastery: 0,
    createdAt: 1718010000119,
  },

  {
    id: 'telc-b2-20-fitnessstudio',
    folderId: 'beschwerde',
    title: '20. شكوى بخصوص وعود نادي اللياقة البدنية (Fitnessstudio Premium)',
    content: `Max Mustermann
Musterstraße 12
12345 Musterstadt

Musterstadt, den 11.06.2026

Premium-Fitness GmbH
Sportplatz 8
50667 Köln

Betreff: Beschwerde über den Service im Premium-Fitnessstudio

Sehr geehrte Damen und Herren,

Durch Ihre Anzeige wurde ich auf Ihr Angebot aufmerksam. Da Ihr Angebot einen guten Eindruck machte, entschied ich mich dafür. Leider musste ich feststellen, dass die Realität nicht Ihren Angaben entsprach. Deshalb sehe ich mich veranlasst, Ihnen diese Beschwerde zu schreiben.

Zunächst möchte ich erwähnen, dass ich mich in Ihrem Studio angemeldet habe, da Sie mit modernen Geräten und einer Sauna werben. Außerdem muss ich darauf hinweisen, dass die Hälfte der Kraftgeräte defekt ist und die Duschen verschimmelt sind. Darüber hinaus war ich besonders enttäuscht darüber, dass der Wellnessbereich wegen angeblicher Energiesparmaßnahmen geschlossen bleibt.

Aus diesem Grund erwarte ich eine angemessene Entschädigung beziehungsweise eine Stellungnahme Ihrerseits. Ich hoffe, dass Sie meine Beschwerde ernst nehmen und entsprechende Maßnahmen ergreifen. Ich sehe Ihrer baldigen Antwort mit Erwartung entgegen.

Mit freundlichen Grüßen,
Max Mustermann`,
    mastery: 0,
    createdAt: 1718010000120,
  },

  {
    id: 'telc-b2-21-onlineshopping',
    folderId: 'beschwerde',
    title: '21. شكوى بخصوص شراء ملابس من متجر إلكتروني (Online-Shopping)',
    content: `Max Mustermann
Musterstraße 12
12345 Musterstadt

Musterstadt, den 11.06.2026

TrendModen GmbH
Modestraße 100
80333 München

Betreff: Beschwerde über die erhaltene Ware von TrendModen

Sehr geehrte Damen und Herren,

Durch Ihre Anzeige wurde ich auf Ihr Angebot aufmerksam. Da Ihr Angebot einen guten Eindruck machte, entschied ich mich dafür. Leider musste ich feststellen, dass die Realität nicht Ihren Angaben entsprach. Deshalb sehe ich mich veranlasst, Ihnen diese Beschwerde zu schreiben.

Zunächst möchte ich erwähnen, dass ich bei Ihnen hochwertige Kleidung für einen anstehenden Urlaub bestellt habe. Außerdem muss ich darauf hinweisen, dass die gelieferte Ware eine völlig falsche Größe hatte und gravierende Nähfehler aufwies. Darüber hinaus war ich besonders enttäuscht darüber, dass der Kundenservice meine E-Mails bzgl. einer Rücksendung ignoriert hat.

Aus diesem Grund erwarte ich eine angemessene Entschädigung beziehungsweise eine Stellungnahme Ihrerseits. Ich hoffe, dass Sie meine Beschwerde ernst nehmen und entsprechende Maßnahmen ergreifen. Ich sehe Ihrer baldigen Antwort mit Erwartung entgegen.

Mit freundlichen Grüßen,
Max Mustermann`,
    mastery: 0,
    createdAt: 1718010000121,
  },
];
