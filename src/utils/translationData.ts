/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TranslationBlock {
  title: string;
  german: string;
  arabic: string;
}

export const METHODOLOGY_TRANSLATIONS: Record<string, TranslationBlock[]> = {
  'telc-b2-01-matratze': [
    { title: 'العنوان والمعلومات', german: 'Vorname Nachname...', arabic: 'الاسم والعنوان والتاريخ وعنوان شركة المراتب والموضوع.' },
    { title: 'التحية الرسمية', german: 'Sehr geehrte Damen und Herren,', arabic: 'سيداتي وسادتي الأفاضل، (تنبيه: يبدأ السطر التالي بحرف صغير)' },
    { title: 'جملة المقدمة الأولى', german: 'durch Ihre Anzeige wurde ich auf Ihr Angebot aufmerksam.', arabic: 'من خلال إعلانكم تيقظ انتباهي لعرضكم / تعرفت على عرضكم.' },
    { title: 'جملة المقدمة الثانية', german: 'da Ihr Angebot einen guten Eindruck machte, entschied ich mich dafür.', arabic: 'وبما أن عرضكم ترك انطباعًا جيدًا، فقد قررت اختياره.' },
    { title: 'جملة المقدمة الثالثة', german: 'leider musste ich feststellen, dass die Realität nicht Ihren Angaben entsprach. Deshalb sehe ich mich veranlasst, Ihnen diese Beschwerde zu schreiben.', arabic: 'لكنني لاحظت لأسف الشديد أن الواقع لم يكن مطابقًا لمواصفاتكم المعلنة. لذلك أجد نفسي مضطرًا لكتابة هذه الشكوى إليكم.' },
    { title: 'النقطة الأولى في العرض', german: 'zunächst möchte ich erwähnen, dass die gelieferte Komfort-Matratze extrem hart ist und überhaupt nicht dem versprochenen Schlafgefühl entspricht.', arabic: 'في البداية، أود أن أذكر بأن مرتبة الراحة التي تم تسليمها صلبة بشكل مفرط ولا تتطابق إطلاقاً مع تجربة النوم المريحة والمريحة الموعودة.' },
    { title: 'النقطة الثانية في العرض', german: 'außerdem muss ich darauf hinweisen, dass die Lieferung statt der versprochenen zwei Werktage über drei Wochen gedauert hat.', arabic: 'علاوة على ذلك، يجب أن أشير إلى أن الشحن والتسليم استغرق أكثر من ثلاثة أسابيع بدلاً من يومي العمل الموعود بهما.' },
    { title: 'النقطة الثالثة في العرض', german: 'darüber hinaus war ich besonders enttäuscht darüber, dass der Lieferfahrer sich weigerte, meine alte Matratze mitzunehmen, obwohl ich dafür extra bezahlt hatte.', arabic: 'بالإضافة إلى ذلك، شعرت بخيبة أمل شديدة من أن سائق التوصيل رفض أخذ مرتبتي القديمة للتخلص منها، على الرغم من دفع رسوم إضافية لهذا التبادل.' },
    { title: 'طلب الحل أو التعويض', german: 'aus diesem Grund erwarte ich eine angemessene Entschädigung beziehungsweise eine Stellungnahme Ihrerseits.', arabic: 'أطالب بتعويض عادل ومناسب أو بالحصول على توضيح صريح من طرفكم بهذا الشأن.' },
    { title: 'الخاتمة وجملة الختام', german: 'ich hoffe, dass Sie meine Beschwerde ernst nehmen und entsprechende Maßnahmen ergreifen. Ich sehe Ihrer baldigen Antwort mit Erwartung entgegen.', arabic: 'آمل أن تأخذوا شكواي بمحمل من الجد وتتخذوا الإجراءات التصحيحية اللازمة. وأتطلع بشوق لردكم القريب والمسؤول.' },
    { title: 'التحية الختامية', german: 'Mit freundlichen Grüßen', arabic: 'مع أطيب التحيات والتقدير' }
  ],
  'telc-b2-02-kaese': [
    { title: 'التحية الرسمية', german: 'Sehr geehrte Damen und Herren,', arabic: 'سيداتي وسادتي الأفاضل،' },
    { title: 'جملة المقدمة الأولى', german: 'durch Ihre Anzeige wurde ich auf Ihr Angebot aufmerksam.', arabic: 'من خلال إعلانكم تيقظ انتباهي لعرضكم.' },
    { title: 'جملة المقدمة الثانية', german: 'da Ihr Angebot einen guten Eindruck machte, entschied ich mich dafür.', arabic: 'وبما أن عرضكم ترك انطباعًا جيدًا، فقد قررت اختياره.' },
    { title: 'جملة المقدمة الثالثة', german: 'leider musste ich feststellen, dass die Realität nicht Ihren Angaben entsprach. Deshalb sehe ich mich veranlasst, Ihnen diese Beschwerde zu schreiben.', arabic: 'لكنني لاحظت لأسف الشديد أن الواقع لم يكن مطابقًا لمواصفاتكم المعلنة. لذلك أجد نفسي مضطرًا لكتابة هذه الشكوى إليكم.' },
    { title: 'النقطة الأولى في العرض', german: 'zunächst möchte ich erwähnen, dass ich den Käse für ein Familienfrühstück verwenden wollte, da Ihre Werbung absolute Frische verspricht.', arabic: 'بداية، أود أن أذكر بأنني أردت استخدام هذا الجبن لتحضير وجبة إفطار عائلية سارة، نظراً لوعود إعلانكم بنقاوة الصنع المطبقة.' },
    { title: 'النقطة الثانية في العرض', german: 'außerdem muss ich darauf hinweisen, dass alle Familienmitglieder nach dem Verzehr des Käses unter starken Magenschmerzen litten.', arabic: 'علاوة على ذلك، يتوجب علي أن ألفت انتباهكم إلى أن جميع أفراد عائلتي عانوا من آلام ومغص حاد في المعدة بعد تناول هذا الجبن مباشرة.' },
    { title: 'النقطة الثالثة في العرض', german: 'darüber hinaus war ich besonders enttäuscht darüber, dass ich im Käse kleine, gefährliche Plastikstücke gefunden habe, die ein hohes Gesundheitsrisiko darstellen.', arabic: 'إضافة إلى ذلك، تملكتني خيبة أمل مريرة وخوف من عثوري على قطع بلاستيكية صغيرة حادة وخطيرة ملوثة داخل الجبنة، والتي تشكل خطراً صحياً جسيماً.' },
    { title: 'طلب الحل أو التعويض', german: 'aus diesem Grund erwarte ich eine angemessene Entschädigung beziehungsweise eine Stellungnahme Ihrerseits.', arabic: 'لهذا السبب، أتوقع تعويضاً مناسباً مادياً أو رداً وتوضيحاً فورياً من جانبكم.' },
    { title: 'الخاتمة والختام', german: 'ich hoffe, dass Sie meine Beschwerde ernst nehmen und entsprechende Maßnahmen ergreifen. Ich sehe Ihrer baldigen Antwort mit Erwartung entgegen.', arabic: 'آمل أن تؤخذ هذه الشكوى بمحمل الجد التام وتُتخذ التدابير الإجراءات في مصنعكم لمنع ذلك. بانتظار ردكم.' }
  ],
  'telc-b2-03-obstkiste': [
    { title: 'التحية الرسمية', german: 'Sehr geehrte Damen und Herren,', arabic: 'سيداتي وسادتي الأفاضل،' },
    { title: 'التقديم للموضوع', german: 'durch Ihre Anzeige wurde ich auf Ihr Angebot aufmerksam...', arabic: 'عن طريق إعلانكم تعرفت على عرض الصندوق، وبسبب الانطباع الجيد قررت الاشتراك...' },
    { title: 'النقطة الأولى في العرض', german: 'zunächst möchte ich erwähnen, dass ich mich für Ihr Obstabo entschieden habe, um frische, regionale Bio-Produkte zu erhalten.', arabic: 'بادئ ذي بدء، أود الإشارة للسبب؛ فقد اخترت هذا الاشتراك الدوري رغبةً مني في تلقي فواكه وخضروات طازجة وعضوية ومحلية لصحتي.' },
    { title: 'النقطة الثانية في العرض', german: 'außerdem muss ich darauf hinweisen, dass fast die Hälfte des gelieferten Gemüses bereits faul und ungenießbar war.', arabic: 'بالإضافة إلى ذلك، يلزم إخباركم بأن ما يقرب من نصف الخضار المورد وصل تالفاً تماماً، متعفناً وغير صالح للاستخدام البشري.' },
    { title: 'النقطة الثالثة في العرض', german: 'darüber hinaus war ich besonders enttäuscht darüber, dass die Lieferung mehrmals verspätet ankam und die Kisten stark verschmutzt waren.', arabic: 'وفوق ذلك، أصبت بخيبة أمل عميقة نظراً لأن التوصيل تأخر مراراً، وكانت الصناديق الخشبية متسخة بشدة ولا تليق بمنتجات غذائية عائلية.' }
  ],
  'telc-b2-04-apps': [
    { title: 'التحية والمقدمة', german: 'Sehr geehrte Damen und Herren, durch Ihre Anzeige...', arabic: 'سيداتي وسادتي، لفت انتباهي إعلان موقعكم وحفزني لتنزيل الألعاب المجانية والاشتراك ولكن التفاصيل خالفت الواقع كثيراً...' },
    { title: 'النقطة الأولى في العرض', german: 'zunächst möchte ich erwähnen, dass ich die angeblich kostenlosen Spiele-Apps für mein Smartphone nutzen wollte.', arabic: 'في البداية، أود التنويه أن غايتي كانت فقط تثبيت ولعب تطبيقات الألعاب المجانية المذكورة للهواتف الذكية للتسلية.' },
    { title: 'النقطة الثانية في العرض', german: 'außerdem muss ich darauf hinweisen, dass mir trotz des Versprechens kostenloser Dienste sofort ein hoher Monatsbeitrag abgebucht wurde.', arabic: 'إلا أنني فوجئت وللأسف بأنه على الرغم من وعودكم بأن الخدمات مجانية، قام نظامكم بخصم مبلغ اشتراك شهري باهظ من حسابي فوراً.' },
    { title: 'النقطة الثالثة في العرض', german: 'darüber hinaus war ich besonders enttäuscht darüber, dass die meisten Apps ständig abstürzen und überhaupt nicht funktionieren.', arabic: 'علاوة على ذلك، شعرت بإحباط وبخيبة أمل شديدة لاعتراض البرامج مشاكل تهنيج وأعطال مستمرة؛ فمعظم التطبيقات لا تعمل أصلاً وتغلق بدون سبب.' }
  ],
  'telc-b2-05-staubsauger': [
    { title: 'المقدمة والشكوى', german: 'Sehr geehrte Damen und Herren, durch Ihre Anzeige...', arabic: 'سيداتي وسادتي، تصفحت إشهار مكنسة الروبوت الذكية وقررت اقتناءها آملاً إعفائي من مشقة الكنس والتمتع ببيئة نظيفة هادئة.' },
    { title: 'النقطة الأولى في العرض', german: 'zunächst möchte ich erwähnen, dass ich diesen Roboter kaufte, um Zeit im Haushalt zu sparen, da er laut Anzeige leise arbeitet.', arabic: 'أود أن أسطر أولاً بأن دافع شرائي لهذه المكنسة هو رغبتي بتوفير الوقت للراحة بالمنزل، استناداً لضمانات إعلانكم بأنها تعمل بصمت عجيب وبلا إزعاج.' },
    { title: 'النقطة الثانية في العرض', german: 'außerdem muss ich darauf hinweisen, dass das Gerät extrem laut ist und ständig heftig gegen meine wertvollen Möbel stößt.', arabic: 'بيد أنني فوجئت بأن الروبوت يولد ضوضاء عالية، كما أنه يفتقر لنظام توجيه سليم فيصطدم بعنف بشكل متكرر بقطع الأثاث الفاخر بالمنزل.' },
    { title: 'النقطة الثالثة في العرض', german: 'darüber hinaus war ich besonders enttäuscht darüber, dass die App-Steuerung im Alltag überhaupt keine Verbindung zum Gerät herstellen kann.', arabic: 'كما أصبت بالخيبة الأكبر من عدم تمكن التطبيق المخصص للهاتف من الاقتران مطلقاً بالجهاز للتحكم فيه عن بعد وهو ما يعد خللاً تاماً.' }
  ],
  'telc-b2-06-hoteltherme': [
    { title: 'المقدمة والبداية', german: 'Sehr geehrte Damen und Herren, durch Ihre Anzeige...', arabic: 'سيداتي وسادتي، قادتني منشوراتكم لاختيار فندقكم والاسترخاء بمنتجعكم العلاجي للاستجمام في عطلة نهاية الأسبوع.' },
    { title: 'النقطة الأولى في العرض', german: 'zunächst möchte ich erwähnen, dass ich mich auf ein erholsames Wochenende mit einem wunderschönen Blick in die Natur gefreut hatte.', arabic: 'أولاً، سأذكر بأن توقعي الأساسي والوحيد كان قضاء ويكند مريح مفعم بالهدوء مع إطلالة بانورامية ساحرة على المساحات الخضراء الموعودة.' },
    { title: 'النقطة الثانية في العرض', german: 'außerdem muss ich darauf hinweisen, dass mein Zimmer keinen Balkon hatte und direkt über einer lauten Hauptstraße lag.', arabic: 'لكنني لفت إلى أن غرفتي المحجوزة كانت خالية تماماً من الشرفة المطلة، بل كانت تقع مباشرة فوق شارع رئيسي صاخب جداً تملأه السيارات.' },
    { title: 'النقطة الثالثة في العرض', german: 'darüber hinaus war ich besonders enttäuscht darüber, dass das Wasser der Therme eiskalt war und die Saunalandschaft schmutzig wirkte.', arabic: 'ويضاف لذلك، إحباطي الجسيم من أن مياه المسبح العلاجي الداخلي كانت شبه متجمدة باردة، فضلاً عن سقف الحمامات والساونا المتسخ والمهمل.' }
  ],
  'telc-b2-07-reisebuero': [
    { title: 'التحية والمقدمة', german: 'Sehr geehrte Damen und Herren, durch Ihre Anzeige...', arabic: 'سيداتي وسادتي، قمت بالتسجيل في باقة العطلة المتكاملة في مصلحة رحلاتكم طمعاً برحلة مريحة خالية من أي قلق إداري أو خلافه.' },
    { title: 'النقطة الأولى في العرض', german: 'zunächst möchte ich erwähnen, dass ich eine voll organisierte Pauschalreise gebucht hatte, um mich im Urlaub um nichts kümmern zu müssen.', arabic: 'بداية، أؤكد لكم بأني دفعت ثمن حجز لرحلة سياحية شاملة ومكتملة التنسيق والخدمات لكي أستقر وأستمتع بإجازتي دون متاعب جانبية.' },
    { title: 'النقطة الثانية في العرض', german: 'außerdem muss ich darauf hinweisen, dass es bei unserer Ankunft am späten Abend kein freies Zimmer für uns im Hotel gab.', arabic: 'ولكن للأسف، وبمجرد وصولنا إلى الفندق في وقت متأخر من الليل، تم إخبارنا بعدم وجود أي حجز باسمنا أو غرف متاحة خالية لاستيعابنا.' },
    { title: 'النقطة الثالثة في العرض', german: 'darüber hinaus war ich besonders enttäuscht darüber, dass der Reiseleiter vor Ort sehr unhöflich war und uns überhaupt nicht helfen wollte.', arabic: 'وكانت الطامة الكبرى وخيبة أملي من سلوك المندوب السياحي للشركة بالمنطقة؛ حيث اتصف بوقاحة وأسلوب غليظ وامتنع عن مد يد العون لنا نهائياً.' }
  ],
  'telc-b2-08-kursschulung': [
    { title: 'المقدمة والتحية', german: 'Sehr geehrte Damen und Herren, durch Ihre Anzeige...', arabic: 'سيداتي وسادتي، انضممت للدورة المكثفة البالغة قيمتها 120 يورو لبناء قدرات التواصل المهنية والتحدث بثقة في سوق الشغل.' },
    { title: 'النقطة الأولى في العرض', german: 'zunächst möchte ich erwähnen, dass ich an diesem teuren Seminar teilgenommen habe, um mich professionell präsentieren zu lernen.', arabic: 'في المقام الأول، أود الإيضاح بأنني تكبدت كلفة هذا التدريب الغالي لتعلم تقنيات العرض الذاتي المنهجية وتقديمي باحترافية للشركات.' },
    { title: 'النقطة الثانية في العرض', german: 'außerdem muss ich darauf hinweisen, dass der Dozent völlig unvorbereitet war und am ersten Tag nur veraltete Folien vorgelesen hat.', arabic: 'غير أن المحاضر المسؤول شتت انتباهنا لعدم تحضيره؛ فكل الذي مارسه في اليوم الأول كان إلقاء عروض قديمة وشرائح مكررة بلا تنشيط.' },
    { title: 'النقطة الثالثة في العرض', german: 'darüber hinaus war ich besonders enttäuscht darüber, dass das versprochenen Praktikum am zweiten Tag wegen schlechter Organisation komplett ausfiel.', arabic: 'والأهم من ذلك، حزنت بشدة لأن الجانب العملي الموعود في اليوم الثاني المتمثل في الورش والتدريبات التطبيقية ألغي كلياً لفوضى التسيير.' }
  ],
  'telc-b2-09-wohndesign': [
    { title: 'البداية والتمهيد', german: 'Sehr geehrte Damen und Herren, durch Ihre Anzeige...', arabic: 'سيداتي وسادتي، قادني السعي لإعادة تصميم منزلي والاطلاع على الأساليب الحديثة لحجز تذكرة ورشة عمل الديكور والألوان بأكاديميتكم.' },
    { title: 'النقطة الأولى في العرض', german: 'zunächst möchte ich erwähnen, dass ich an diesem Workshop teilgenommen habe, um meine Wohnung nach aktuellen Tendenzen zu gestalten.', arabic: 'في البداية، أود الإفصاح بأن سبب انضمامي لهذه المدارسة هو دافع الاستفادة الحية من الخبرة والاتجاهات لتخطيط وتنظيم الأثاث والجدران عهداً بعهد.' },
    { title: 'النقطة الثانية في العرض', german: 'außerdem muss ich darauf hinweisen, dass der Kurs mit über zwei Stunden Verspätung begann und die Kursleiterin sehr ungeduldig war.', arabic: 'بيد أن التجربة ساءت لعقد الحصة متأخرة بأكثر من ساعتين عن الموعد المقرر، مما ضيع يومنا، كما تميزت المحاضرة بعصبية ونفاد صبر كبير.' },
    { title: 'النقطة الثالثة في العرض', german: 'darüber hinaus war ich besonders enttäuscht darüber, dass wichtige angekündigte Themen wie die harmonische Beleuchtung komplett ignoriert wurden.', arabic: 'منتهى الاستياء والخذلان كان تغاضي المديرة عن عدة محاور في الإشهار؛ كمحور التوزيع المتناسق للمصابيح المودرن وتثبيتها، حيث تم تجاوزه وإهماله.' }
  ],
  'telc-b2-10-renovierung': [
    { title: 'التحية والمقدمة', german: 'Sehr geehrte Damen und Herren, durch Ihre Anzeige...', arabic: 'سيداتي وسادتي، سجلت بالدورة العملية لتتعلم تزيين وترميم الغرف بنفسي كعمل تطبيقي شيق توفيراً للنفقات.' },
    { title: 'النقطة الأولى في العرض', german: 'zunächst möchte ich erwähnen, dass ich diesen Wochenendkurs gewählt habe, um das Tapezieren und Streichen praktisch zu erlernen.', arabic: 'بداية، أشارككم بأني استقريت على هذه الدورة لتطبيق المكتسبات اليدوية كتركيب ورق الحائط، والدهان وإعداد الأسطح تحت إشراف مرشدين.' },
    { title: 'النقطة الثانية في العرض', german: 'außerdem muss ich darauf hinweisen, dass statt der maximal 10 Teilnehmer über 25 Personen anwesend waren, weshalb es viel zu eng war.', arabic: 'ولكني تضايقت من تواجد ٢٥ متدرباً صاخباً بالفصل على الرغم من تأكيد المطبوعات على حصر العدد لعشرة أفراد فقط، مما أعاق الحركة لضيق المساحة.' },
    { title: 'النقطة الثالثة في العرض', german: 'darüber hinaus war ich besonders enttäuscht darüber, dass es nicht genügend Werkzeuge und Materialien für die praktischen Übungen gab.', arabic: 'والأسوأ من ذلك حرماننا من الممارسة لعدم كفاية الفرش والمقصات ومواد الطلاء ومعدات العمل للجمع الموجود، مما حول السيمينار لمحاضرة نظرية جافة.' }
  ],
  'telc-b2-11-engagement': [
    { title: 'سياق العمل التطوعي', german: 'Sehr geehrte Damen und Herren, durch Ihre Anzeige...', arabic: 'سيداتي وسادتي، وددت بكل شغف تقديم خبرتي الحياتية لمساندة وتأطير النشء للتخطيط للمستقبل والانضمام لجمعية مرافقة الشباب.' },
    { title: 'النقطة الأولى في العرض', german: 'zunächst möchte ich erwähnen, dass ich Schülern ehrenamtlich beim Übergang zwischen Schule und Beruf aktiv helfen wollte.', arabic: 'أود بداءةً توضيح أن مطلبي الرئيسي كان مساعدة الطلبة الصغار بشكل طوعي لتسهيل ولوجهم للشواغل والتدريبات وتأهيلهم نفسياً لها.' },
    { title: 'النقطة الثانية في العرض', german: 'außerdem muss ich darauf hinweisen, dass die versprochenen drei Vorbereitungsseminare kurzfristig und ersatzlos abgesagt wurden.', arabic: 'ولكني منزعج لأن اللقاءات الإعدادية التأهيلية الثلاثة المقررة لإرشادنا ككفلاء شباب ألغيت بشكل مفاجئ وفظ دون تعويض أو اعتذار مسبق.' },
    { title: 'النقطة الثالثة في العرض', german: 'darüber hinaus war ich besonders enttäuscht darüber, dass wir vom Team des Vereins keinerlei Unterstützung bei unserer Arbeit erhielten.', arabic: 'وحبطت آمالي أكثر لافتقار التنسيق؛ فلم يزودنا الكادر الإداري بأوراق توجيهية أو مذكرات دعم تساندنا وتجيب على استفهاماتنا الكثيرة.' }
  ],
  'telc-b2-12-apartmenthaus': [
    { title: 'تمهيد السكن المؤقت', german: 'Sehr geehrte Damen und Herren, durch Ihre Anzeige...', arabic: 'سيداتي وسادتي، دفعتني الظروف العملية للإقامة المؤقتة بشققكم المفروشة بحثاً عن الطمأنينة والهدوء اللازمين لإنهاء مهامي بـ Oranienburg.' },
    { title: 'النقطة الأولى في العرض', german: 'zunächst möchte ich erwähnen, dass ich für ein dringendes berufliches Projekt für drei Monate nach Oranienburg ziehen musste.', arabic: 'يتصل الأمر أولاً بحاجتي الماسة للسكن والاستقرار لمدة تناهز ثلاثة أشهر قصد الركوز لمهام هندسية بمؤسسة محلية بالولاية.' },
    { title: 'النقطة الثانية في العرض', german: 'außerdem muss ich darauf hinweisen, dass die Wohnung bei meiner Ankunft nicht gereinigt war und wichtige Möbelstücke sowie Bettwäsche fehlten.', arabic: 'ولكنني استعدت صدمة دخول الشقة؛ فلم تهيأ لنا بالنظافة الواجبة، بل كانت الأغبرة وسخة وافتقرت الشقة لقطع أثاث وأفرشة مذكورة بالعقد.' },
    { title: 'النقطة الثالثة في العرض', german: 'darüber hinaus war ich besonders enttäuscht darüber, dass die Heizung komplett defekt war und wir tagelang kein warmes Wasser hatten.', arabic: 'ولا ريب أن غياب التدفئة والمياه الساخنة لعدة أيام في ظل الأجواء الباردة سبب لي ولعائلتي متاعب ونزلات برد شديدة عطلت مصالحنا.' }
  ],
  'telc-b2-13-autovermietung': [
    { title: 'استئجار السيارة', german: 'Sehr geehrte Damen und Herren, durch Ihre Anzeige...', arabic: 'سيداتي وسادتي، لجأت لخدمتكم قصد استئجار سيارة سياحية تليق بموعد أعمال مهم والظهور بمظهر مشرف وجذاب.' },
    { title: 'النقطة الأولى في العرض', german: 'zunächst möchte ich erwähnen, dass ich für ein wichtiges Geschäftswochenende ein modernes und zuverlässiges Auto gemietet hatte.', arabic: 'في الأول، أسرد لكم أني تعاقدت واستأجرت عربة بمقاييس حديثة ومريحة لحضور مؤتمرات أعمال دقيقة بمدينة بون.' },
    { title: 'النقطة الثانية في العرض', german: 'außerdem muss ich darauf hinweisen, dass das gelieferte Fahrzeug innen extrem schmutzig war und der Motor unruhige Geräusche machte.', arabic: 'لكنني تفاجأت بغبار وأوساخ تملأ مقاعد السيارة من الداخل، إلى جانب اضطراب واهتزاز شديد لمحرك السيارة بشكل يهدد السلامة ويربك الركاب.' },
    { title: 'النقطة الثالثة في العرض', german: 'darüber hinaus war ich besonders enttäuscht darüber, dass der Kundenservice trotz einer garantierten Erreichbarkeit rund um die Uhr besetzt war.', arabic: 'وزاد سخطاً عدم جدوى ميزة الطوارئ؛ فعلى الرغم من وعودكم ببث الدعم الفني طيلة الأسبوع، اتصلت مراراً وتكراراً دون رد من الكول سنتر.' }
  ],
  'telc-b2-14-freizeitverein': [
    { title: 'أنشطة النادي الاجتماعي', german: 'Sehr geehrte Damen und Herren, durch Ihre Anzeige...', arabic: 'سيداتي وسادتي، التحقت بالنادي الاجتماعي قصد الاندماج وبناء دائرة معارف دافئة في مدينة ماينتس وتجنب روتين عطلات نهاية الأسبوع الرتيبة.' },
    { title: 'النقطة الأولى في العرض', german: 'zunächst möchte ich erwähnen, dass ich dem Verein beigetreten bin, um neue Menschen kennenzulernen und gemeinsam Ausflüge zu machen.', arabic: 'في البداية، أود ذكر أن غايتي وراء التسجيل كانت عقد صداقات ومقابلة نخبة من المترددين للمغامرة والرحلات الخلوية الممتعة سوية.' },
    { title: 'النقطة الثانية في العرض', german: 'außerdem muss ich darauf hinweisen, dass in den letzten zwei Wochen fast alle angekündigten Spiele- und Kinoabende ausgefallen sind.', arabic: 'ولكني صُعقت بأن جل الفعاليات المسائية كعروض السينما والألعاب الملغية تماماً هذا الأسبوع، لعدم وجود تنسيق بين مكاتبكم.' },
    { title: 'النقطة الثالثة في العرض', german: 'darüber hinaus war ich besonders enttäuscht darüber, dass trotz des reduzierten Programms der volle Mitgliedsbeitrag abgebucht wurde.', arabic: 'بجانب حزني لاستقطاع القسط الشهري المالي بالكامل من حسابي البنكي كرسوم اشتراك دوري رغم إلغاء وتساهل تقديم الأنشطة المتفق عليها.' }
  ],
  'telc-b2-15-naturmuseum': [
    { title: 'زيارة متحف التاريخ الطبيعي', german: 'Sehr geehrte Damen und Herren, durch Ihre Anzeige...', arabic: 'سيداتي وسادتي، اصطحبت أقراني بمعهد اللغة الألماني للمتحف لرؤية المستحاثات والديناصورات وتحسين معلوماتنا اللغوية ببيئة ممتعة.' },
    { title: 'النقطة الأولى in العرض', german: 'zunächst möchte ich erwähnen, dass ich das Museum zusammen mit meinen Kollegen aus dem Sprachkurs besuchen wollte, um viel zu lernen.', arabic: 'أود تبيين أن حافزي كان تبسيط واستقراء أسرار الطبيعة التاريخية لطلبة صفنا ومناقشة ذلك سوية في حصة المحادثة القادمة.' },
    { title: 'النقطة الثانية in العرض', german: 'außerdem muss ich darauf hinweisen, dass die bestellten Audio-Guides defekt waren und wir keinerlei Erklärungen anhören konnten.', arabic: 'لكننا تفاجأنا بتعطل الأجهزة السمعية المرشدة، مما حرم الحاضرين من سماع وشرح تراكيب وهياكل العروض الأثرية الممتعة.' },
    { title: 'النقطة الثالثة in العرض', german: 'darüber hinaus war ich besonders enttäuscht darüber, dass viele Ausstellungsbereiche wegen mangelhafter Organisation gesperrt blieben.', arabic: 'كما عانينا من الإغلاق الفجائي لثلاث قاعات دراسية رئيسية للتحضير والتحديث، وحرمنا من زيارتها دون سابق إنذار بموقعكم الإلكتروني.' }
  ],
  'telc-b2-16-musical': [
    { title: 'جولة خلف الكواليس', german: 'Sehr geehrte Damen und Herren, durch Ihre Anzeige...', arabic: 'سيداتي وسادتي، تطلعت دائماً للولوج خلف كواليس المسارح الغنائية لرؤية صناعة الأزياء وتدريب الممثلين عن قرب.' },
    { title: 'النقطة الأولى in العرض', german: 'zunächst möchte ich erwähnen, dass ich einen detaillierten Blick hinter die Kulissen werfen wollte, um den Ablauf eines Musicals zu verstehen.', arabic: 'السبب الأول هو رغبتي بتلمس فنيات الإنتاج الصامت العظيم؛ ككيفية تشييد الجدران، ووضع التبرج والمساحيق وإضاءة خشبة العرض للمسرحية.' },
    { title: 'النقطة الثانية in العرض', german: 'außerdem muss ich darauf hinweisen, dass die Führung statt der versprochenen drei Stunden bereits nach dreißig Minuten beendet wurde.`', arabic: 'إلا أن مرشد السياحة أنهى المسار بأكمله في غضون ٣٠ دقيقة باهتة متجاهلاً الشرح بدلاً من ثلاث ساعات المقررة والمعلنة.' },
    { title: 'النقطة الثالثة in العرض', german: 'darüber hinaus war ich besonders enttäuscht darüber, dass wir keinen einzigen Darsteller trafen und das Kostüm-Archiv verschlossen war.', arabic: 'كما أصبت بالاحتقان لإبقاء قبو تخزين ملابس الممثلين مغلقاً بالأقفال وحرماننا من تحية المغنيين بدعوى غيابهم للراحة.' }
  ],
  'telc-b2-17-kultur': [
    { title: 'الرحلة الثقافية والغذائية', german: 'Sehr geehrte Damen und Herren, durch Ihre Anzeige...', arabic: 'سيداتي وسادتي، حجزت بالرحلة الثقافية "صوب المجهول" طمعاً بالترويح عن النفس ومأدبة الغداء التقليدية اللذيذة الموصوفة.' },
    { title: 'النقطة الأولى in العرض', german: 'zunächst möchte ich erwähnen, dass ich an diesem Ausflug teilgenommen habe, um einen entspannten Tag in angenemmer Gesellschaft zu verbringen.', arabic: 'أؤكد أولاً أن شغفي ومطالبي كانت قضاء نهار هادئ ووديع بين رفقة ممتعة تتبادل الحديث في الحافلة السياحية المريحة.' },
    { title: 'النقطة الثانية in العرض', german: 'außerdem muss ich darauf hinweisen, dass das versprochene traditionelle Mittagessen aus kalten, unappetitlichen Essensresten bestand.', arabic: 'لكن صدمتنا تكمن في البوفيه الموصوف؛ فالوجبة لم تطه طازجاً أبداً بل قدمت باردة وبقايا طعام ذابل لا يوفر أدنى قدر للنظافة والذوق.' },
    { title: 'النقطة الثالثة in العرض', german: 'darüber hinaus war ich besonders enttäuscht darüber, dass uns am Besichtigungsort unaufgefordert minderwertige Waren aufgedrängt wurden.', arabic: 'ومما زاد الطين بلة قيام المرشد بتحويل الزيارة لمحطة دعاية تجارية خانقة وإرغامنا على تمويل وشراء أجهزة منزلية رديئة الصنع وابتزازنا.' }
  ],
  'telc-b2-18-fahrradtour': [
    { title: 'جولة ركوب الدراجات', german: 'Sehr geehrte Damen und Herren, durch Ihre Anzeige...', arabic: 'سيداتي وسادتي، استأجرت دراجة وانضممت لمجموعة "انقض النشاط" لرعاية صحتي القلبية والتمتع برحلة مع الموجهين.' },
    { title: 'النقطة الأولى in العرض', german: 'zunächst möchte ich erwähnen, dass mich Ihr Angebot „Radeln mit Spaß" ansprach, um mich am Wochenende sportlich zu betätigen.', arabic: 'أود تبيين أن رغبتي كانت ممارسة النشاط العضلي الطبي وعلاج الخمول في بيئة منظمة هادفة مفعمة بالطاقة والترفيه واللقاء الخلوي.' },
    { title: 'النقطة الثانية in العرض', german: 'außerdem muss ich darauf hinweisen, dass das mir zur Verfügung gestellte Leihrad eine defekte Bremse hatte, was lebensgefährlich war.', arabic: 'لكن الخطر الداهم كان الدراجة المسلمة لي؛ حيث اكتشفت عطلاً تاماً في كوابحها العجلة الأمامية مما كاد يودي بحياتي للارتطام مع السيارات.' },
    { title: 'النقطة الثالثة in العرض', german: 'darüber hinaus war ich besonders enttäuscht darüber, dass der Trainer auf meine Fragen sehr unhöflich reagierte und uns ignorierte.', arabic: 'وفوق هذا تفاجأت بالجلافة التامة للمشرف؛ فكان يجيب على استفساراتي بنبرة سخرية لا تليق بمرشد رياضي، متجاهلاً حماية السلامة.' }
  ],
  'telc-b2-19-sprachkurs': [
    { title: 'التحضير للغة بـ B2', german: 'Sehr geehrte Damen und Herren, durch Ihre Anzeige...', arabic: 'سيداتي وسادتي، قيدت اسمي بالمعهد في باقة الإعداد المكثفة بهدف الفهم الوافي لبنية اختبار B2 واجتيازه بيسر وتألق.' },
    { title: 'النقطة الأولى in العرض', german: 'zunächst möchte ich erwähnen, dass ich diesen Intensivkurs gebucht habe, um mich gezielt auf die TELC B2-Prüfung vorzubereiten.', arabic: 'أود أن أؤكد بامتثال أن سبب إنفاقي لهذا الاستثمار المالي هو التعرف على مناهج الإنشاء الكتابي وكسر رهبة الفحص المحكي للغة.' },
    { title: 'النقطة الثانية in العرض', german: 'außerdem muss ich darauf hinweisen, dass der Unterricht ständig ausfiel und wir fast keine schriftlichen Übungen korrigiert bekommen haben.', arabic: 'غير أن الحصص كانت تلغى دون تعويض، والأوراق الإنشائية التعبيرية المودعة لم تصحح أو يتم تغذيتها بالملاحظات اللازمة لصياغتنا.' },
    { title: 'النقطة الثالثة in العرض', german: 'darüber hinaus war ich besonders enttäuscht darüber, dass die Sprachlehrerin kaum fehlerfreies Deutsch sprach und didaktisch ungeschult war.', arabic: 'كما تملكتني الحسرة لمستوى المعلمة العاجز عن التعبير بصرف سليم وبأخطاء متواصلة بتهجئة الأسماء وضعف المهارات التدريسية الكلية.' }
  ],
  'telc-b2-20-fitnessstudio': [
    { title: 'نادي اللياقة البدنية', german: 'Sehr geehrte Damen und Herren, durch Ihre Anzeige...', arabic: 'سيداتي وسادتي، أتممت حجز الاشتراك السنوي بمشفاكم الرياضي طمعاً بالأجهزة الحديثة المنشورة وغرفة الساونا للتأهيل.' },
    { title: 'النقطة الأولى in العرض', german: 'zunächst möchte ich erwähnen, dass ich mich in Ihrem Studio angemeldet habe, da Sie mit modernen Geräten und einer Sauna werben.', arabic: 'الدافع من تسجيل اسمي كان ممارسة الرعاية البدنية بمعدات متكاملة والاسترخاء بقبو التدفق الساخن لتنشيط الأوعية الدموية.' },
    { title: 'النقطة الثانية in العرض', german: 'außerdem muss ich darauf hinweisen, dass die Hälfte der Kraftgeräte defekt ist und die Duschen verschimmelt sind.', arabic: 'ولكني رصدت تلفاً في نصف الأوزان وصدأ يعتري أجهزة تمارين الضغط، كما أن غرف تغيير ملابس الحمامات تملؤها الفطريات والرطوبة.' },
    { title: 'النقطة الثالثة in العرض', german: 'darüber hinaus war ich besonders enttäuscht darüber, dass der Wellnessbereich wegen angeblicher Energiesparmaßnahmen geschlossen bleibt.', arabic: 'ولا يخفى عليكم امتعاضي الكبير من الإغلاق والمنع المعمم لقاعة الساونا بدعوى ضبط النفقات الطاقية وهو تراجع عن العهد المقبوض.' }
  ],
  'telc-b2-21-onlineshopping': [
    { title: 'شراء الملابس أونلاين', german: 'Sehr geehrte Damen und Herren, durch Ihre Anzeige...', arabic: 'سيداتي وسادتي، اشتريت سترة وبنطالاً من منصتكم السياحية طمعاً ببدل مريحة لحضور مناسبات ترفيهية دقيقة بالعطلة الأسبوعية.' },
    { title: 'النقطة الأولى in العرض', german: 'zunächst möchte ich erwähnen, dass ich bei Ihnen hochwertige Kleidung für einen anstehenden Urlaub bestellt habe.', arabic: 'دوافع تعاملي المالي هو المصلحة المشهرة لخياطة القطع ونقاء نسيج الصوف الموصوف لتجنب عيوب الملابس الرديئة.' },
    { title: 'النقطة الثانية in العرض', german: 'außerdem muss ich darauf hinweisen, dass die gelieferte Ware eine völlig falsche Größe hatte und gravierende Nähfehler aufwies.', arabic: 'ولكن الطرود الواصلة كانت بمقاسات مختلفة تماماً وواسعة، مصاحبة لعيوب وثقوب وتلف واضح بخطوط التطريز والحياكة.' },
    { title: 'النقطة الثالثة in العرض', german: 'darüber hinaus war ich besonders enttäuscht darüber, dass der Kundenservice meine E-Mails bzgl. einer Rücksendung ignoriert hat.', arabic: 'وقد حاولت مراراً مراسلة قسم التدخل والمنازعات لإرسال الفواتير واستعادة النقود ولكن دون تلقي أي اتصال أو اهتمام.' }
  ],
};

export const PARAPHRASE_OPTS = {
   Bezug: [
    "durch Ihre Anzeige wurde ich auf Ihr Angebot aufmerksam.",
    "aufgrund Ihrer vielversprechenden Anzeige habe ich mich für Ihr Angebot entschieden.",
    "nachdem ich Ihre Anzeige gelesen hatte, interessierte ich mich sehr für Ihr Angebot.",
    "angeregt durch Ihre überzeugende Anzeige, habe ich mich vor Kurzem für Ihr Angebot entschieden.",
    "Ihre ansprechend gestaltete Anzeige hat meine Aufmerksamkeit erregt, weshalb ich mich für Ihr Angebot entschied."
  ],
  Eindruck: [
    "da Ihr Angebot einen guten Eindruck machte, entschied ich mich dafür.",
    "die besonders herausgestellten Eigenschaften in Ihrer Anzeige entsprachen genau meinen Vorstellungen.",
    "der ausschlaggebende Faktor für meine Wahl war das attraktive Versprechen in Ihrem Inserat.",
    "da die Beschreibung sehr vielversprechend klang, habe ich mich kurzfristig dazu entschlossen."
  ],
  Diskrepanz: [
    "leider musste ich feststellen, dass die Realität nicht Ihren Angaben entsprach. Deshalb sehe ich mich veranlasst, Ihnen diese Beschwerde zu schreiben.",
    "leider entspricht die Realität absolut nicht den Angaben in Ihrer Werbung. Aus diesem Grund fühle ich mich gezwungen, diese Beschwerde zu verfassen.",
    "bedauerlicherweise musste ich vor Ort feststellen, dass die Gegebenheiten nicht mit Ihren Versprechungen übereinstimmten. Dies veranlasst mich nun, Ihnen diese Beanstandung zu schildern.",
    "leider entsprachen die tatsächlichen Bedingungen vor Ort keineswegs den Angaben in Ihrem Prospekt. Deswegen sehe ich mich leider veranlasst, Ihnen diese Reklamation zu senden."
  ],
  Schluss: [
    "ich hoffe, dass Sie meine Beschwerde ernst nehmen und entsprechende Maßnahmen ergreifen. Ich sehe Ihrer baldigen Antwort mit Erwartung entgegen.",
    "für Ihre rasche Rückmeldung wäre ich Ihnen dankbar und ich freue mich darauf, bald von Ihnen zu hören.",
    "ich hoffe sehr, in Kürze von Ihnen eine Stellungnahme zu erhalten und verbleibe mit Erwartung Ihres Schreibens.",
    "ich sehe einer zeitnahen Rückmeldung mit Spannung und Erwartung entgegen."
  ]
};

export function paraphraseContent(content: string, seed: number): string {
  const paragraphs = content.split(/\n\s*\n/);
  let salutationIdx = -1;
  let hasMitFreundlichen = -1;

  for (let i = 0; i < paragraphs.length; i++) {
    const trimmed = paragraphs[i].trim();
    if (trimmed.startsWith('Sehr geehrte')) {
      salutationIdx = i;
    }
    if (trimmed.includes('Mit freundlichen')) {
      hasMitFreundlichen = i;
    }
  }

  if (salutationIdx === -1) {
    return content;
  }

  const newParagraphs = [...paragraphs];

  const introIdx = salutationIdx + 1;
  if (introIdx < newParagraphs.length) {
    const rBezug = PARAPHRASE_OPTS.Bezug[seed % PARAPHRASE_OPTS.Bezug.length];
    const rEindruck = PARAPHRASE_OPTS.Eindruck[(seed + 1) % PARAPHRASE_OPTS.Eindruck.length];
    const rDiskrepanz = PARAPHRASE_OPTS.Diskrepanz[(seed + 2) % PARAPHRASE_OPTS.Diskrepanz.length];
    newParagraphs[introIdx] = `${rBezug} ${rEindruck} ${rDiskrepanz}`;
  }

  const outroIdx = hasMitFreundlichen !== -1 ? hasMitFreundlichen - 1 : newParagraphs.length - 2;
  if (outroIdx > introIdx && outroIdx < newParagraphs.length) {
    const currentOutro = newParagraphs[outroIdx];
    let leadSentence = "Aus diesem Grund erwarte ich eine angemessene Entschädigung beziehungsweise eine Stellungnahme Ihrerseits.";
    if (currentOutro.trim().startsWith("Aus diesem Grund") || currentOutro.trim().startsWith("aus diesem Grund")) {
      const match = currentOutro.match(/^([^.!?]+[.!?])/);
      if (match) {
        leadSentence = match[1];
      }
    }
    const rSchluss = PARAPHRASE_OPTS.Schluss[(seed + 3) % PARAPHRASE_OPTS.Schluss.length];
    newParagraphs[outroIdx] = `${leadSentence} ${rSchluss}`;
  }

  return newParagraphs.join('\n\n');
}

