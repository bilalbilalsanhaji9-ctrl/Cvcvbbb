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
    color: 'from-red-500 to-rose-600',
  },
  {
    id: 'meinung',
    nameAr: 'إبداء الرأي (Meinung)',
    nameDe: 'Diskussionsbeitrag / Meinung',
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 'anfrage',
    nameAr: 'استفسارات (Anfrage)',
    nameDe: 'Anfrage',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'bewerbung',
    nameAr: 'طلبات تقديم (Bewerbung)',
    nameDe: 'Bewerbung',
    color: 'from-blue-500 to-indigo-600',
  },
];

export const DEFAULT_METHODOLOGIES: Methodology[] = [
  {
    id: 'telc-b2-beschwerde-standard',
    folderId: 'beschwerde',
    title: 'منهجية شكوى نموذجية - TELC B2 Beschwerde (Reise)',
    content: `Sehr geehrte Damen und Herren,

mit großem Interesse habe ich Ihre Anzeige im Internet gelesen und mich sofort für diese Reise entschieden. Da die Beschreibung sehr vielversprechend klang, waren meine Erwartungen hoch. Leider musste ich feststellen, dass die Realität vor Ort überhaupt nicht Ihren Zusagen entsprach, weshalb ich Ihnen heute schreibe.

Zuerst möchte ich auf das Hotel eingehen. In Ihrer Anzeige stand, dass das Hotel nur fünf Minuten vom Strand entfernt liegt und über ein modernes Schwimmbad verfügt. In Wahrheit lag das Hotel an einer Hauptstraße und der Fußweg zum Strand dauerte fast eine halbe Stunde. Zudem war das Schwimmbad wegen Renovierungsarbeiten während des gesamten Aufenthalts geschlossen.

Ein weiterer Kritikpunkt ist die Verpflegung. Versprochen wurde ein reichhaltiges Büfett mit regionalen Spezialitäten. Tatsächlich gab es jeden Tag die gleichen, unappetitlichen Speisen.

Wegen dieser zahlreichen Mängel war mein Urlaub ruined. Aus diesem Grund erwarte ich eine angemessene Rückerstattung von mindestens 50 Prozent des Reisepreises.

Sollte ich innerhalb von zwei Wochen keine Rückmeldung von Ihnen erhalten, werde ich meinen Anwalt einschalten.

Mit freundlichen Grüßen,
Max Mustermann`,
    mastery: 0,
    createdAt: 1718010000000,
  },
  {
    id: 'telc-b2-meinung-homeoffice',
    folderId: 'meinung',
    title: 'منهجية إبداء الرأي حول العمل من المنزل - Homeoffice Meinung',
    content: `Sehr geehrte Damen und Herren,

ich möchte mich an der Diskussion über das Thema „Homeoffice" beteiligen, da dieses Thema in der heutigen Zeit von großer Bedeutung ist und fast jeden Arbeitnehmer betrifft.

Meiner Ansicht nach bietet das Arbeiten von zu Hause aus sowohl Vorteile als auch beträchtliche Nachteile. Ein wesentlicher Vorteil ist zweifellos die enorme Zeitersparnis, da der tägliche Arbeitsweg wegfällt. Dadurch lässt sich das Privatleben viel besser mit dem Berufsleben vereinbaren, was die Zufriedenheit der Mitarbeiter steigert.

Allerdings darf man die Schattenseiten nicht übersehen. Ein großes Problem stellt die soziale Isolation dar, da der persönliche Kontakt zu den Kollegen verloren geht. Des Weiteren fällt es vielen Menschen schwer, im Homeoffice eine klare Grenze zwischen Arbeit und Freizeit zu ziehen, was langfristig zu Stress führen kann.

Zusammenfassend lässt sich sagen, dass Homeoffice eine wunderbare Ergänzung ist, aber ein gesundes Gleichgewicht zwischen Präsenzzeit im Büro und Heimarbeit gefunden werden muss.

Mit freundlichen Grüßen,
Anna Becker`,
    mastery: 0,
    createdAt: 1718010000001,
  },
  {
    id: 'telc-b2-anfrage-kurs',
    folderId: 'anfrage',
    title: 'منهجية استفسار عن دورة تعليمية - Anfrage Sprachkurs',
    content: `Sehr geehrte Damen und Herren,

ich plane, im kommenden Sommer meine Deutschkenntnisse zu verbessern, und bin im Internet auf Ihre Sprachschule aufmerksam geworden. Da ich mich auf die TELC B2-Prüfung vorbereiten möchte, habe ich noch einige Fragen zu Ihrem Angebot und bitte um Auskunft.

Zunächst würde ich gerne wissen, wie viele Stunden Unterricht pro Woche vorgesehen sind und wie groß die Lerngruppen im Durchschnitt sind. Für mich ist eine persönliche Betreuung besonders wichtig, um gezielt an meinen Schwächen im schriftlichen Ausdruck arbeiten zu können.

Darüber hinaus interessiere ich mich für die Qualifikationen Ihrer Lehrkräfte. Könnten Sie mir bitte mitteilen, ob diese über eine zertifizierte Ausbildung im Bereich „Deutsch als Fremdsprache" verfügen?

Schließlich wäre es für mich von großer Bedeutung zu erfahren, ob die Prüfungsgebühren bereits im Kurspreis enthalten sind oder ob diese separat entrichtet werden müssen. Über eine Zusendung von Informationsmaterial sowie ein konkretes Angebot würde ich mich sehr freuen.

Ich bedanke mich im Voraus für Ihre Bemühungen und verbleibe mit freundlichen Grüßen,
Sarah Schmidt`,
    mastery: 0,
    createdAt: 1718010000002,
  },
  {
    id: 'telc-b2-bewerbung-stelle',
    folderId: 'bewerbung',
    title: 'منهجية تقديم على وظيفة - Bewerbung um eine Stelle',
    content: `Sehr geehrte Damen und Herren,

mit großem Interesse habe ich Ihre Stellenanzeige auf Ihrer Webseite gelesen. Da ich über eine fundierte Ausbildung und mehrjährige Berufserfahrung in diesem Bereich verfüge, bewerbe ich mich hiermit um die ausgeschriebene Position.

In meiner letzten Beschäftigung war ich hauptsächlich für die Kundenbetreuung und die Organisation von Arbeitsabläufen zuständig. Diese Aufgaben haben mir nicht nur viel Freude bereitet, sondern auch meine Kommunikationsfähigkeit und Belastbarkeit gestärkt. Ich zeichne mich durch ein hohes Maß an Teamfähigkeit, Zuverlässigkeit und eine schnelle Auffassungsgabe aus.

Ihre Firma genießt einen hervorragenden Ruf, weshalb ich sehr motiviert bin, mein Wissen gewinnbringend in Ihr Team einzubringen. Über die Gelegenheit, mich Ihnen in einem persönlichen Gespräch vorzustellen, würde ich mich sehr freuen.

In der Anlage finden Sie meinen Lebenslauf sowie meine Zeugnisse. Für eventuelle Rückfragen stehe ich Ihnen jederzeit gerne zur Verfügung.

Mit freundlichen Grüßen,
Michael Weber`,
    mastery: 0,
    createdAt: 1718010000003,
  },
];
