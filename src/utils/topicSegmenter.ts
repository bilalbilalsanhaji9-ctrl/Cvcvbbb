import { METHODOLOGY_TRANSLATIONS } from './translationData';

export interface LetterSection {
  titleAr: string;
  titleDe: string;
  germanText: string;
  arabicText: string;
  colorClass: string;
  itemBadges?: Array<{ text: string; german: string; arabic: string; subColor: string }>;
}

export interface SegmentedLetter {
  id: string;
  kopf: LetterSection;
  einleitung: LetterSection;
  hauptteil: LetterSection;
  schluss: LetterSection;
  gruss: LetterSection;
}

// Translations for Betreff lines in all 21 methodologies
const BETREFF_MAP: Record<string, string> = {
  'telc-b2-01-matratze': 'شكوى بخصوص مرتبة السرير (Matratze - Baumeister-Betten)',
  'telc-b2-02-kaese': 'شكوى بخصوص جبنة ذائبة ملوثة (Schmelzkäse Alpengeschmack)',
  'telc-b2-03-obstkiste': 'شكوى بخصوص صندوق الفواكه والخضار (Meine Kiste Abo)',
  'telc-b2-04-apps': 'شكوى بخصوص تطبيقات هاتف مدفوعة (Kostenlose Apps - prima-app)',
  'telc-b2-05-staubsauger': 'شكوى بخصوص مكنسة روبوت ذكية (Staubsaugroboter SuperClean)',
  'telc-b2-06-hoteltherme': 'شكوى بخصوص فندق وقاعة علاجية (Hotel mit Thermen)',
  'telc-b2-07-reisebuero': 'شكوى بخصوص حجز رحلة سياحية متكاملة (Reisebüro Sonnenschein)',
  'telc-b2-08-kursschulung': 'شكوى بخصوص دورة تدريبية مهنية (Schulung - Kursbeschreibung)',
  'telc-b2-09-wohndesign': 'شكوى بخصوص ورشة عمل التصميم والديكور (Modernes Wohndesign)',
  'telc-b2-10-renovierung': 'شكوى بخصوص دورة أعمال ترميم (Renovierungskurs)',
  'telc-b2-11-engagement': 'شكوى بخصوص تنظيم عمل تطوعي (Bilderpaten für Jugendliche)',
  'telc-b2-12-apartmenthaus': 'شكوى بخصوص شقة سكنية مؤقتة (Apartmenthaus Oranienburg)',
  'telc-b2-13-autovermietung': 'شكوى بخصوص خدمة استئجار سيارة (Autovermietung Neustadt)',
  'telc-b2-14-freizeitverein': 'شكوى بخصوص أنشطة نادي ترفيهي (Freizeitverein)',
  'telc-b2-15-naturmuseum': 'شكوى بخصوص زيارة متحف الطبيعة (Naturmuseum)',
  'telc-b2-16-musical': 'شكوى بخصوص جولة كواليس مسرحية (Backstage-Musical-Tour)',
  'telc-b2-17-kultur': 'شكوى بخصوص جولة ثنائية ثقافية وغذائية (Kultur und Kulinarik)',
  'telc-b2-18-fahrradtour': 'شكوى بخصوص جولة ركوب الدراجات (Fahrradtour - Radle dich munter)',
  'telc-b2-19-sprachkurs': 'شكوى بخصوص دورة تحضير امتحان اللغة (Sprachkurs - TELC B2)',
  'telc-b2-20-fitnessstudio': 'شكوى بخصوص وعود نادي اللياقة البدنية (Fitnessstudio Premium)',
  'telc-b2-21-onlineshopping': 'شكوى بخصوص شراء ملابس من متجر إلكتروني (Online-Shopping)',
};

// Common boilerplate sentence mappings (case-insensitive keys for maximum match compatibility)
const ARABIC_BOILERPLATE_DICT: Record<string, string> = {
  // Bezug
  "durch ihre anzeige wurde ich auf ihr angebot aufmerksam.": "من خلال إعلانكم، تيقظ انتباهي لعرضكم اللطيف والمهتم.",
  "aufgrund ihrer vielversprechenden anzeige habe ich mich für ihr angebot entschieden.": "بناءً على إعلانكم المشجع والواعد للغاية، قررت اختيار عرضكم المقترح والاستفادة منه.",
  "nachdem ich ihre anzeige gelesen hatte, interessierte ich mich sehr für ihr angebot.": "بعد قراءتي المتعمعة لإعلانكم المبهر، أبديت اهتمامًا بالغًا ووددت تجربة هذا العرض المعروض.",
  "angeregt durch ihre überzeugende anzeige, habe ich mich vor kurzem für ihr angebot entschieden.": "مستلهمًا من جاذبية وإقناع إعلانكم البارز بقوة، قررت مؤخرًا الاعتماد على خدماتكم الموعودة.",
  "ihre ansprechend gestaltete anzeige hat meine aufmerksamkeit erregt, weshalb ich mich für ihr angebot entschied.": "لفت انتباهي تصميم إعلانكم الراقي والأنيق، ولهذا استقريت دون تردد على الاشتراك في خدمتكم.",

  // Eindruck
  "da ihr angebot einen guten eindruck machte, entschied ich mich dafür.": "وبما أن عرضكم ترك انطباعًا مريحًا ورائعًا في البداية، فقد قررت اختياره بكل سرور.",
  "die besonders herausgestellten eigenschaften in ihrer anzeige entsprachen genau meinen vorstellungen.": "إن الخصائص والمميزات الفريدة المذكورة بإسهاب في إعلانكم تلاءمت تمامًا مع تطلعاتي الشخصية الأكيدة.",
  "der ausschlaggebende faktor für meine wahl war das attraktive versprechen in ihrem inserat.": "العامل الحاسم الذي شجعني ووجه اختياري بنجاح هو الوعود الجذابة المكتوبة في مطبوعتكم الترويجية.",
  "da die beschreibung sehr vielversprechend klang, habe ich mich kurzfristig dazu entschlossen.": "ولأن التفاصبل في الوصف سُرِدت بروح واعدة ومدعاة للراحة، حسمت أمري عاجلاً وقررت خوض التجربة.",

  // Diskrepanz
  "leider musste ich feststellen, dass die realität nicht ihren angaben entsprach. deshalb sehe ich mich veranlasst, ihnen diese beschwerde zu schreiben.": "ولكني تفاجأت وصدمت لأسف الشديد بأن الواقع الفعلي مغاير ومخالف لمواصفاتكم المعلنة بوضوح بالدعاية، وهو ما اضطرني لكتابة رسالة الشكوى هذه.",
  "leider entspricht die realität absolut nicht den angaben in ihrer werbung. aus diesem grund fühle ich mich gezwungen, diese beschwerde zu verfassen.": "يا للأسف، الواقع العملي لا يمت بصلة لما نشرتموه بإشهاركم. ولهذا السبب بالتحديد أجد نفسي مجبرًا كليًا على صياغة الشكوى لطلب حقي.",
  "bedauerlicherweise musste ich vor ort feststellen, dass die gegebenheiten nicht mit ihren versprechungen übereinstimmten. dies veranlasst mich nun, ihnen diese beanstandung zu schildern.": "غير أن ما عشته على أرض الواقع من قصور لم يتفق مطلقًا مع وعودكم البراقة، الأمر الذي يحثني الآن على بسط هذه الشكاوى لسيادتكم بالتفصيل.",
  "leider entsprachen die tatsächlichen bedingungen vor ort keineswegs den angaben in ihrem prospekt. deswegen sehe ich mich leider veranlasst, ihnen diese reklamation zu senden.": "مع الأسف، المرافق والظروف الطبيعية الملموسة لم ترتق كليًا للمستوى المدون بالكتيب التعريفي، وعليه وجهت لشركتكم هذا الخطاب لالتماس حل عادل.",

  // Compensation / Response
  "aus diesem grund erwarte ich eine angemessene entschädigung beziehungsweise eine stellungnahme ihrerseits.": "لهذا السبب، أطالب بتعويض عادل مادياً أو بالحصول على توضيح وتفسير رسمي وصريح من طرفكم بهذا الخصوص.",
  "ich hoffe, dass sie meine beschwerde ernst nehmen und entsprechende maßnahmen ergreifen. ich sehe ihrer baldigen antwort mit erwartung entgegen.": "كلي أمل أن تأخذوا باعتراضي بمحمل الجد الكافي وتبادروا باتخاذ الإجراءات التصحيحية الفورية، وبانتظار ردكم ومسؤوليتكم العاجلة.",
  "für ihre rasche rückmeldung wäre ich ihnen dankbar und ich freue mich darauf, bald von ihnen zu hören.": "سأكون شاكراً لكم وممتناً للغاية لتجاوبكم السريع على إخطاري هذا، ومتشوق لسماع حل مقنع من جهتكم بأول وقت.",
  "ich hoffe sehr, in kürze von ihnen eine stellungnahme zu erhalten und verbleibe mit erwartung ihres schreibens.": "آمل بشدة وسرور تلقي إيضاح وتفسير كتابي دقيق من جانبكم في غضون الأيام القادمة، وظللت منتظرًا لبيانكم الإداري المسؤول.",
  "ich sehe einer zeitnahen rückmeldung mit spannung und erwartung entgegen.": "أتطلع بحماس واهتمام شديد لتلقي رد ومراجعة لشكواي من جهتكم في القرب العاجل والمنصف.",

  // Common Salutations / Headers
  "sehr geehrte damen und herren,": "السيدات والسادة الأفاضل، تحية طيبة وبعد: (ملاحظة: السطر التالي يبدأ بحرف صغير بالمنهجية)",
  "mit freundlichen grüßen,": "مع فائق الاحترام والتقدير، متبوعًا باسمك.",
  "mit freundlichen grüßen": "مع أطيب التحيات والتقدير، متبوعًا باسمك.",
  "max mustermann": "ماكس مسترمان (الاسم الافتراضي للمتدرب)"
};

// Helper to normalize the query key for dict lookup
function lookupTranslation(german: string): string {
  const normalized = german.trim().toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").replace(/\s+/g," ");
  for (const [key, value] of Object.entries(ARABIC_BOILERPLATE_DICT)) {
    const keyNormalized = key.trim().toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").replace(/\s+/g," ");
    if (keyNormalized === normalized || normalized.includes(keyNormalized) || keyNormalized.includes(normalized)) {
      return value;
    }
  }
  return "";
}

export function segmentAndTranslateLetter(topicId: string, content: string): SegmentedLetter {
  // Split raw text into paragraphs
  const rawParagraphs = content.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
  
  // Standard complaint template is exactly 9 paragraphs
  // (0: Sender, 1: Date, 2: Recipient, 3: Betreff, 4: Salutation, 5: Einleitung, 6: Hauptteil, 7: Schluss, 8: Regards+Name)
  const is9Params = rawParagraphs.length >= 9;

  // 1. Kopf Section Extraction
  const senderGe = is9Params ? rawParagraphs[0] : "Max Mustermann, Musterstraße 12...";
  const dateGe = is9Params ? rawParagraphs[1] : "Musterstadt, den ...";
  const recipientGe = is9Params ? rawParagraphs[2] : "Firma ...";
  const subjectGe = is9Params ? rawParagraphs[3] : "Betreff: ...";
  const salutationGe = is9Params ? rawParagraphs[4] : "Sehr geehrte Damen und Herren,";

  const subjectTopicNameAr = BETREFF_MAP[topicId] || "تفاصيل شكوى رسمية حول الإعلان المغاير للحقيقة";
  
  const kopfGerman = `${senderGe}\n${dateGe}\n${recipientGe}\n${subjectGe}\n\n${salutationGe}`;
  const kopfArabic = `[المُرسِل]: بيانات المرسل\n[التاريخ]: ${dateGe}\n[المرسل إليه]: بيانات الشركة\n[الموضوع]: ${subjectTopicNameAr}\n\n[التحية]: ${salutationGe === 'Sehr geehrte Damen und Herren,' ? 'سيداتي وسادتي الأفاضل (يجب وضع غومة خلفها والبدء بحرف صغير بعدها!)' : 'التحية الرسمية المعتمدة'}`;

  // 2. Einleitung Section Extraction
  const einleitungParagraph = is9Params ? rawParagraphs[5] : "";
  // Split Einleitung into sentences manually/robustly
  const einleitungSentences = einleitungParagraph ? einleitungParagraph.match(/[^.!?]+[.!?]+/g)?.map(s => s.trim()) || [einleitungParagraph] : [];
  
  const einleitungItems: Array<{ text: string; german: string; arabic: string; subColor: string }> = [];
  const labels = ["جملة جذب الانتباه والاهتمام (Bezug)", "جملة الانطباع الإيجابي الأولي (Eindruck)", "جملة الصدمة والشكوى الواقعية (Diskrepanz)"];
  
  einleitungSentences.forEach((sentence, idx) => {
    let arab = lookupTranslation(sentence);
    if (!arab && topicId && METHODOLOGY_TRANSLATIONS[topicId]) {
      // fallback search in database blocks
      const dbMatch = METHODOLOGY_TRANSLATIONS[topicId].find(b => sentence.toLowerCase().includes(b.german.toLowerCase().slice(0, 15)));
      if (dbMatch) arab = dbMatch.arabic;
    }
    if (!arab) arab = "من خلال إعلانكم المذكور، تفاعلنا مع العرض المتاح ولكنه لم يلبي تطلعاتنا الواقعية الموصوفة.";
    
    einleitungItems.push({
      text: labels[Math.min(idx, labels.length - 1)],
      german: sentence,
      arabic: arab,
      subColor: idx === 0 ? 'border-teal-500/25 bg-teal-500/5 text-teal-300' : idx === 1 ? 'border-indigo-500/25 bg-indigo-500/5 text-indigo-300' : 'border-rose-500/25 bg-rose-500/5 text-rose-350'
    });
  });

  // 3. Hauptteil Section Extraction
  const hauptteilParagraph = is9Params ? rawParagraphs[6] : "";
  const hauptteilSentences = hauptteilParagraph ? hauptteilParagraph.match(/[^.!?]+[.!?]+/g)?.map(s => s.trim()) || [hauptteilParagraph] : [];
  const hauptteilItems: Array<{ text: string; german: string; arabic: string; subColor: string }> = [];

  const pointLabels = ["النقطة الأولى العريضة (Zunächst/في البداية)", "النقطة الثانية المكملة (Außerdem/علاوة على ذلك)", "النقطة الثالثة المكملة (Darüber hinaus/بالإضافة لـ)"];
  
  // Try to bind translations from database
  hauptteilSentences.forEach((sentence, idx) => {
    let arab = "";
    if (topicId && METHODOLOGY_TRANSLATIONS[topicId]) {
      // custom matcher for prefix or inclusion
      const prefixWords = sentence.split(/\s+/).slice(0, 4).join(" ").toLowerCase();
      const match = METHODOLOGY_TRANSLATIONS[topicId].find(b => {
        const bg = b.german.toLowerCase();
        return bg.includes(prefixWords) || prefixWords.includes(bg) || sentence.toLowerCase().includes(bg.slice(0, 20));
      });
      if (match) {
        arab = match.arabic;
      }
    }
    // Deep fallback translation extraction for specific fields
    if (!arab && topicId && METHODOLOGY_TRANSLATIONS[topicId]) {
      const idxs = [5, 6, 7]; // standard positions of main body items in fully indexed models
      const block = METHODOLOGY_TRANSLATIONS[topicId][idxs[idx] || (idx + 3)];
      if (block) arab = block.arabic;
    }
    if (!arab) {
      // default translation lookup fallback
      arab = "هنا تفصيل النقطة والشكوى الخاصة بـ " + sentence.substring(0, 30) + "...";
    }

    hauptteilItems.push({
      text: pointLabels[Math.min(idx, pointLabels.length - 1)],
      german: sentence,
      arabic: arab,
      subColor: idx === 0 ? 'border-amber-500/25 bg-amber-500/5 text-amber-300' : idx === 1 ? 'border-orange-500/25 bg-orange-500/5 text-orange-300' : 'border-amber-600/25 bg-amber-600/5 text-amber-400'
    });
  });

  // 4. Schluss Section Extraction
  const schlussParagraph = is9Params ? rawParagraphs[7] : "";
  const schlussSentences = schlussParagraph ? schlussParagraph.match(/[^.!?]+[.!?]+/g)?.map(s => s.trim()) || [schlussParagraph] : [];
  const schlussItems: Array<{ text: string; german: string; arabic: string; subColor: string }> = [];

  schlussSentences.forEach((sentence, idx) => {
    let arab = lookupTranslation(sentence);
    if (!arab && topicId && METHODOLOGY_TRANSLATIONS[topicId]) {
      const dbMatch = METHODOLOGY_TRANSLATIONS[topicId].find(b => sentence.toLowerCase().includes(b.german.toLowerCase().slice(0, 15)));
      if (dbMatch) arab = dbMatch.arabic;
    }
    if (!arab) {
      if (idx === 0) arab = "لهذا أرجو منكم تعويضًا مناسبًا أو ردًا مسببًا على اعتراضي هذا.";
      else arab = "آمل أخذ هذه الملاحظة بمحمل الجد، وأتطلع لسماع ردكم القريب.";
    }

    schlussItems.push({
      text: idx === 0 ? "طلب التعويض والتسوية الودية (Lösung)" : "خاتمة معبرة عن الأمل والتطلع للرد (Abschluss)",
      german: sentence,
      arabic: arab,
      subColor: idx === 0 ? 'border-emerald-500/25 bg-emerald-500/5 text-emerald-300' : 'border-teal-500/25 bg-teal-500/5 text-teal-300'
    });
  });

  // 5. Regards Section Extraction
  const regardsGe = paragraphsAfter(rawParagraphs, 8);
  const regardsAr = "مع أطيب التحيات والتقدير المخلص،\n[اسمك الكامل]";

  return {
    id: topicId,
    kopf: {
      titleAr: "الرأس والموضوع والمعلومات الرسمية (Kopf)",
      titleDe: "Briefkopf, Betreff & Anrede",
      germanText: kopfGerman,
      arabicText: kopfArabic,
      colorClass: "from-cyan-500/10 to-blue-500/5 border-cyan-500/20 text-cyan-400"
    },
    einleitung: {
      titleAr: "المقدمة الممهدة والشكوى من الواقع (Einleitung)",
      titleDe: "Einleitung (3 feste Sätze / 3 عبارات محفوظة)",
      germanText: einleitungParagraph,
      arabicText: "تتكون مادة التقديم دائمًا من 3 جمل أساسية محفوظة (جملة جذب الاهتمام بالإعلان، جملة الانطباع اللطيف، وجملة الشكوى وصدمة الواقع).",
      colorClass: "from-indigo-500/10 to-purple-500/5 border-purple-500/20 text-purple-300",
      itemBadges: einleitungItems
    },
    hauptteil: {
      titleAr: "عرض المناقشة ومطالب الثلاث نقاط (Hauptteil)",
      titleDe: "Hauptteil (3 Punkte / 3 نقاط شكوى)",
      germanText: hauptteilParagraph,
      arabicText: "يتضمن مناقشة حية لـ (شروط الشكوى الثلاث) المطلوبة بالامتحان لمناقشة العيوب، التأخير، أو الخروقات العقدية.",
      colorClass: "from-amber-500/10 to-orange-500/5 border-amber-500/20 text-amber-300",
      itemBadges: hauptteilItems
    },
    schluss: {
      titleAr: "الخاتمة وطلب التسوية والتعويض (Schluss)",
      titleDe: "Schluss & Entschädigungsforderung",
      germanText: schlussParagraph,
      arabicText: "تحتوي على الإشارة المباشرة لمطالبك بالتعويض عن الأضرار أو الاسترداد المالي، متبوعًا بوعود التواصل المستقبلي السريع.",
      colorClass: "from-emerald-500/10 to-teal-500/5 border-emerald-500/20 text-emerald-300",
      itemBadges: schlussItems
    },
    gruss: {
      titleAr: "التحية النهائية والاسم والتوقيع (Grußformel)",
      titleDe: "Grußformel & Unterschrift",
      germanText: regardsGe,
      arabicText: regardsAr,
      colorClass: "from-slate-500/10 to-slate-700/5 border-slate-700/40 text-slate-350"
    }
  };
}

function paragraphsAfter(paragraphs: string[], startIndex: number): string {
  if (paragraphs.length <= startIndex) return "Mit freundlichen Grüßen,\nMax Mustermann";
  return paragraphs.slice(startIndex).join("\n\n");
}
