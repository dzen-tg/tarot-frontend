// Тексты мини-приложения для пользователей: правь здесь, не трогая index.html.
// Ключ → { ru, en }. {name} и другие подстановки в фигурных скобках не удалять. Тире – только короткое (–).
// Пол человека неизвестен: без «готов», «должен», «сам», «(а)».
window.TEXTS = {
  fate_home_new: { ru: "Узнай свой аркан", en: "Find your arcana" },
  fate_home_new_sub: { ru: "По дате рождения · бесплатно", en: "By date of birth · free" },
  fate_home_done: { ru: "Твой аркан – {arcana}", en: "Your arcana – {arcana}" },
  fate_home_done_sub: { ru: "Разбор Кода судьбы", en: "Fate Code reading" },
  fate_pending: { ru: "Считаем твой Код судьбы. Пришлём его в чат с ботом – обычно это пара минут.", en: "Working out your Fate Code. We'll send it to the bot chat – usually within a couple of minutes." },
  fate_share: { ru: "Поделиться арканом", en: "Share my arcana" },
  quick_fresh: { ru: "Быстрый ответ на твой вопрос", en: "Quick answer to your question" },
  quick_fresh_free: { ru: "бесплатно", en: "free" },
  energy_enough: { ru: "хватает твоей Энергии", en: "you have enough Energy" },
  energy_pack: { ru: "+{energy} ⚡ за {price}", en: "+{energy} ⚡ for {price}" },
  streak_intro: { ru: "Открывай карту каждый день: на {clarify_day}-й день – уточнение к карте, на {quick_every}-й – Быстрый ответ в подарок", en: "Open the card every day: on day {clarify_day} – a free extra card, on day {quick_every} – a free Quick answer" },
  streak_next: { ru: "Через {days} – {gift} в подарок", en: "In {days} – {gift} as a gift" },
  streak_got: { ru: "Подарок получен. Через {days} – {gift} в подарок", en: "Gift received. In {days} – {gift} as a gift" },
  gift_clarify: { ru: "уточнение к карте", en: "an extra card" },
  gift_quick: { ru: "Быстрый ответ", en: "a Quick answer" },
  clarify_gift: { ru: "бесплатно – подарок серии", en: "free – streak gift" },
  daily_ask_own: { ru: "Спросить карты о своём", en: "Ask the cards about yours" },
  daily_share: { ru: "Поделиться картой", en: "Share the card" },
  share_sent: { ru: "Картинка в чате с ботом – перешли её 👆", en: "The picture is in the bot chat – forward it 👆" },
  share_fail: { ru: "Не получилось сделать картинку, попробуй ещё раз.", en: "Couldn't make the picture, try again." },
  pay_missing: { ru: "Не хватает {missing} ⚡ – открываем оплату пакета +{energy}", en: "{missing} ⚡ short – opening payment for +{energy}" },
  adult_title: { ru: "Подтверди возраст", en: "Confirm your age" },
  adult_text: { ru: "Платные расклады – только для тех, кому есть 18 лет.", en: "Paid readings are for people aged 18 and over." },
  adult_ok: { ru: "Мне есть 18 лет", en: "I'm 18 or older" },
  adult_cancel: { ru: "Отмена", en: "Cancel" },
  minor: { ru: "Платные расклады доступны с 18 лет. Карта дня, Код судьбы и сонник раз в день – бесплатно.", en: "Paid readings are available from 18. The card of the day, Fate Code and one dream a day are free." },
  energy_ready: { ru: "Энергия на балансе. Уточняющую карту можно вытянуть в любой момент.", en: "Energy is on your balance. You can draw an extra card any time." },
  mark_yes: { ru: "✅ сбылось", en: "✅ came true" },
  mark_no: { ru: "❌ не сбылось", en: "❌ didn't" },
  mark_wait: { ru: "⏳ ждём", en: "⏳ waiting" },
  mark_match: { ru: "✅ совпало", en: "✅ matched" },
  mark_miss: { ru: "❌ мимо", en: "❌ missed" },
};
window.t = function (key, vars) {
  const lang = window.__lang || "ru";   // язык интерфейса; пока приложение целиком на русском
  const item = (window.TEXTS || {})[key] || {};
  let s = item[lang] || item.ru || key;
  if (vars) for (const k in vars) s = s.split("{" + k + "}").join(vars[k]);
  return s;
};
