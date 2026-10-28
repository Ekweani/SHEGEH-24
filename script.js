(() => {
  "use strict";
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const openingScreen = $("#openingScreen");
  const mainSite = $("#mainSite");
  const footer = $("#siteFooter");
  const toast = $("#toast");
  let currentView = "dashboard";
  let currentFileIndex = 0;
  let quizIndex = 0;
  let quizScore = 0;
  let selectedAnswer = null;
  let answerConfirmed = false;
  let missionUnlocked = false;
  const fileIds = ["001","002","003","004","005","006","007","008"];

  const fileData = [
    {
      id:"001", title:"The Question", eyebrow:"ORIGIN EVENT / 02.03.2024", date:"02.03.2024", location:"UNIVERSITY", status:"ORIGIN EVENT",
      quote:"“Will you grow with me?”", note:"And that was where this story began.",
      sections:[
        ["01","THE INCIDENT",["March 2, 2024.","Somewhere between university life, conversations, and everything neither of us probably knew was about to happen, a question was asked.","Not “Do you want to go out with me?” Not “Will you be my girlfriend?”","Something different.","“Will you grow with me?”","And somehow, those words became the beginning of us."]],
        ["02","THE FOLLOW-UP",["You said yes. Then came:","“Are you sure?”","You told him to come out the following day. If he could find you, you'd give him your answer.","He came out early. He found you. He had been out in the cold, waiting and looking for you.","And after all that effort… you gave him your answer."]]
      ],
      result:"RELATIONSHIP ESTABLISHED.", ending:["Some stories begin with a plan.","Ours began with a question.","And I'm still glad I said yes."]
    },
    {
      id:"002", title:"The Journey", eyebrow:"POST-CONVOCATION / THE ILORIN ROUTE", date:"AFTER CONVOCATION", location:"OMU-ARAN → ILORIN", status:"FAVOURITE MEMORY",
      quote:"“It was just us, in the car, with nowhere else to be for a little while.”", note:"A simple memory. One that stayed.",
      sections:[
        ["01","THE ROUTE",["The journey began at school in Omu-Aran, after convocation. You were heading towards Ilorin; he was heading to Mosho, and somehow your paths lined up for a little while longer.","You travelled together, and then you chilled in the car.","Nothing grand had to happen. No elaborate plan. No big occasion being staged for the memory books.","Just time together, in the middle of ordinary life."]],
        ["02","WHY IT STAYED",["Maybe that's why I love remembering it.","Some of my favourite moments with you aren't the loudest or the most carefully planned. Sometimes they're the quiet ones — when we get to be together without needing to make anything extraordinary happen.","That journey is one of those memories I keep close. It reminds me that happiness can be as simple as being beside you, having a little time, and not needing anything more from the moment."]]
      ],
      result:"MILESTONE RECORDED.", ending:["Origin: Omu-Aran.","Destination: Ilorin.","What mattered most: the company."]
    },
    {
      id:"003", title:"Evidence of Love", eyebrow:"REPEATED PATTERN / MULTIPLE OCCASIONS", date:"ONGOING", location:"WHEREVER YOU WERE", status:"STRONG EVIDENCE",
      quote:"“You made the effort to make me happy.”", note:"The little things were never little to me.",
      sections:[
        ["01","THE EVIDENCE",["Love has shown up in many forms, but one thing I keep noticing is your effort.","The gifts you sent from wherever you were for my birthday and Valentine's Day. The thought that went into making me feel remembered, even when we weren't in the same place.","It's not only about the gifts themselves. It's the thought behind them: that you were somewhere else, living your own day, and still made room to think about me."]],
        ["02","THE FINDING",["You have made me feel loved through so many little things.","I notice the effort. I notice when you try to make me happy. I notice that distance doesn't always stop you from finding a way to show up.","This file is not a complete record. The evidence keeps arriving."]]
      ],
      result:"AFFECTION: DOCUMENTED.", ending:["The gifts were lovely.","The thought behind them meant even more.","Evidence status: ongoing."]
    },
    {
      id:"004", title:"Distance", eyebrow:"CURRENT COMPLICATION / LONG DISTANCE", date:"PRESENT DAY", location:"TWO DIFFERENT PLACES", status:"ONGOING",
      quote:"“Distance is part of our story. It does not have to be the whole story.”", note:"CURRENT COMPLICATION: LONG DISTANCE / DIFFICULTY: ANNOYING / STATUS: ONGOING",
      sections:[
        ["01","THE COMPLICATION",["Let's be honest: long distance can be difficult.","There are moments when I wish I could turn an ordinary day into time with you — sit beside you, see your face in person, share a meal, or simply exist in the same place without having to plan around the miles.","Sometimes the distance is annoying. Sometimes it asks more patience of us than we'd like. And sometimes it makes the simple things feel especially precious."]],
        ["02","THE CHOICE",["But I don't want this file to pretend that everything is easy. I want it to say that even when it isn't easy, I still hope for us.","I admire your willingness to make things work. I hope we keep talking, learning each other, being honest, and finding ways to choose one another through this season.","The distance is real. So is the hope I have for where we're going."]]
      ],
      result:"CASE STATUS: STILL CHOOSING US.", ending:["This is a chapter, not the whole book.","One day at a time.","One honest effort at a time."]
    },
    {
      id:"005", title:"Unexpected Finding", eyebrow:"BEHAVIOURAL OBSERVATION / KINDNESS", date:"OBSERVATIONS: MULTIPLE", location:"WHEREVER PEOPLE NEED YOU", status:"CONFIRMED PATTERN",
      quote:"“You are kind even to people you aren't close to.”", note:"A quality that deserves to be recorded.",
      sections:[
        ["01","THE OBSERVATION",["One of the things that surprised me about you is how kind you can be to people you aren't even close to.","It would be easy to reserve kindness only for the people we love, the people who can do something for us, or the people who already belong in our circle.","But I've seen that your kindness isn't limited to that. You can show consideration to people without needing a special reason to do so."]],
        ["02","WHY IT MATTERS",["I admire that about you.","It tells me something about the person you are when there's no obvious reward attached. It is a quiet quality, but it says a lot.","Finding kindness in someone I love makes me respect him even more."]]
      ],
      result:"KINDNESS: NOTED AND ADMIRED.", ending:["Some qualities announce themselves.","Others are revealed in how a person treats people.","This one did not go unnoticed."]
    },
    {
      id:"006", title:"Core Attributes", eyebrow:"SUBJECT PROFILE / VERIFIED QUALITIES", date:"FILED 02.03.2024 → PRESENT", location:"SUBJECT S", status:"HIGH CONFIDENCE",
      quote:"“The things I love about you are not just what you do for me. They are also who you are.”", note:"Select an attribute below to examine the evidence.",
      sections:[
        ["01","THE PROFILE",["SMART — I admire your mind and the way you think.","KIND — You can be considerate even to people you aren't close to.","LOVING — I see the ways you make an effort to make me happy.","HARDWORKING — I admire the effort you put into your life and responsibilities.","FAITHFUL — Your faithfulness matters to me.","LOVES GOD — I love that your relationship with God is part of who you are."]],
        ["02","THE FINDING",["No single quality explains a whole person. But these are some of the things I notice and value in you.","I hope you keep growing in the things that matter to you, and I hope you always know that I see more than the role you play in my life. I see a person I admire."]]
      ],
      result:"SUBJECT PROFILE: DISTINCTIVE.", ending:["Smart. Kind. Loving. Hardworking.","Faithful. A man who loves God.","And very, very loved."]
    },
    {
      id:"007", title:"The Willingness to Try", eyebrow:"LONGITUDINAL STUDY / PERSONAL GROWTH", date:"ONGOING", location:"REAL LIFE", status:"PROMISING",
      quote:"“I admire that you are willing to make things work.”", note:"Growth is not never getting it wrong. It is being willing to learn.",
      sections:[
        ["01","THE PATTERN",["One of the things I admire most about you is your willingness to make things work — to learn, to be better, and to try again.","That willingness matters because life doesn't always hand us a perfect script. People make mistakes. Circumstances change. Sometimes the first attempt doesn't work the way we hoped.","What matters is whether we are willing to listen, learn, and keep putting in honest effort."]],
        ["02","THE HOPE",["I don't expect either of us to be perfect. I hope we can keep being people who are willing to grow.","The question that started us wasn't about having everything figured out. It was about growth. I hope we continue to honour that question in the ways we treat ourselves and each other.","I am rooting for the person you are becoming — and for the people we are becoming, too."]]
      ],
      result:"GROWTH MINDSET: OBSERVED.", ending:["Keep learning.","Keep becoming.","Keep being willing to try."]
    },
    {
      id:"008", title:"Known Peculiarities", eyebrow:"FIELD OBSERVATION / FOOD-RELATED", date:"REPEATED INCIDENTS", location:"WHEREVER THERE IS FOOD", status:"HIGHLY SUSPICIOUS",
      quote:"“The sniffing continues to be unexplained.”", note:"A completely serious investigation into a very unserious phenomenon.",
      sections:[
        ["01","THE PHENOMENON",["The subject has reportedly been observed sniffing while eating food that is not even peppery.","This behaviour has raised several questions among the research team. Is it an automatic response? A culinary ritual? An advanced sensory process unavailable to the general public?","No definitive explanation has been established."]],
        ["02","THE SCIENTIFIC FINDING",["After repeated observation, the research team has reached the following conclusion: he is going to do what he does.","The phenomenon remains unexplained, the evidence remains compelling, and the subject has shown no signs of discontinuing the practice.","Further investigation may be required. Preferably over a meal."]]
      ],
      result:"PECULIARITY: CONFIRMED.", ending:["Food: not peppery.","Sniffing: still happening.","Researcher: still in love."]
    }
  ];

  const quizQuestions = [
    {cat:"ORIGIN STORY",q:"What question started this relationship?",a:["Will you marry me?","Will you grow with me?","Will you go out with me?","Are you sure about us?"],correct:1,why:"“Will you grow with me?” — the question that started everything."},
    {cat:"ORIGIN STORY",q:"On what date did we officially become us?",a:["14 February 2024","2 March 2024","29 October 2024","3 March 2024"],correct:1,why:"March 2, 2024. The date this case file was established."},
    {cat:"ORIGIN STORY",q:"After asking “Are you sure?”, what did he do?",a:["Waited until the next week","Sent a long email","Came out early and looked for her","Asked someone else to find her"],correct:2,why:"He came out early, found her, and had been out in the cold looking for her."},
    {cat:"THE JOURNEY",q:"Which route holds one of our favourite memories?",a:["Abuja to Kaduna","Omu-Aran to Ilorin","Lagos to Minna","Ilorin to Abuja"],correct:1,why:"Omu-Aran → Ilorin, after convocation."},
    {cat:"THE JOURNEY",q:"What made that journey special?",a:["A luxury hotel","A huge party","Simple time together chilling in the car","A surprise concert"],correct:2,why:"It was a simple moment together in the car — and that's why it stayed."},
    {cat:"EVIDENCE OF LOVE",q:"What kind of effort has made her feel loved?",a:["Only expensive gifts","Sending thoughtful gifts even from wherever he was","Posting every day","Memorising every movie quote"],correct:1,why:"The effort to make her happy, including birthday and Valentine's gifts from wherever he was."},
    {cat:"THE SOUNDTRACK",q:"Which song is associated with our relationship?",a:["Perfect","Belong Together","All of Me","Until I Found You"],correct:1,why:"“Belong Together.”"},
    {cat:"CORE ATTRIBUTES",q:"Which quality does she admire in him?",a:["His willingness to learn and try again","His ability to avoid every challenge","His refusal to change","His talent for disappearing"],correct:0,why:"She admires his willingness to make things work, learn, improve, and try again."},
    {cat:"CORE ATTRIBUTES",q:"Which set best describes the qualities she loves about him?",a:["Funny, famous, mysterious","Smart, kind, loving, hardworking, faithful, loves God","Tall, rich, quiet, serious","Competitive, distant, stubborn"],correct:1,why:"Those are the qualities she specifically named."},
    {cat:"UNEXPECTED FINDING",q:"What surprised her about his kindness?",a:["He is kind only to family","He is kind even to people he isn't close to","He avoids everyone","He never shares anything"],correct:1,why:"She was surprised by how kind he can be even to people he isn't close to."},
    {cat:"KNOWN PECULIARITIES",q:"What suspicious habit has been documented in this archive?",a:["Singing while sleeping","Sniffing while eating food that isn't peppery","Dancing at traffic lights","Talking to the fridge"],correct:1,why:"The non-peppery-food sniffing phenomenon remains under investigation."},
    {cat:"THE CHEF",q:"What is the kitchen's signature dish?",a:["Jollof risotto","Indomie Deluxe","Truffle soup","Birthday pancakes"],correct:1,why:"Indomie Deluxe, naturally."},
    {cat:"THE CHEF",q:"What does the restaurant's review warn about?",a:["The chairs are too small","The chef is handsome, so the reviewer may be biased","There is no water","The menu is written in French"],correct:1,why:"The reviewer's exact disclaimer is that the chef is handsome."},
    {cat:"THE FORMULA",q:"What is the formula's final result?",a:["Under review","Needs more data","Irreplaceable","Please try again later"],correct:2,why:"The official, scientifically questionable result: IRREPLACEABLE."},
    {cat:"DISTANCE",q:"What is the current complication in this story?",a:["A missing passport","Long distance","A cancelled wedding","A broken spaceship"],correct:1,why:"Long distance is difficult, annoying, and an ongoing part of the story."},
    {cat:"THE FUTURE",q:"What does she hope for five years from now?",a:["That this relationship remains intact","That they forget everything","That the archive is deleted","That nobody ever travels again"],correct:0,why:"She hopes the relationship remains intact in five years."},
    {cat:"THE ORIGIN",q:"Where did we meet?",a:["At university","At an airport","At a concert","At a restaurant"],correct:0,why:"You met at university."},
    {cat:"THE LITTLE THINGS",q:"What does she say makes her feel loved?",a:["Being left to guess","His effort to make her happy","Only grand public gestures","Winning every argument"],correct:1,why:"His effort to make her happy is what makes her feel loved."},
    {cat:"GROWTH",q:"What idea sits at the heart of the original question?",a:["Growing together","Never changing","Being perfect","Avoiding hard conversations"],correct:0,why:"The question was an invitation to grow together."},
    {cat:"THE INVESTIGATION",q:"What is the status of the case?",a:["Closed forever","Missing","Active","Classified beyond recovery"],correct:2,why:"CASE STATUS: ACTIVE."},
    {cat:"THE INVESTIGATION",q:"Who made this birthday archive?",a:["A random investigator","Awesome","The chef's assistant","The university registrar"],correct:1,why:"Made with love by Awesome."},
    {cat:"THE SUBJECT",q:"How old is the subject celebrating in this file?",a:["22","23","24","25"],correct:2,why:"SHEGEH // 24."},
    {cat:"THE SOUNDTRACK",q:"What is this website trying to preserve?",a:["A shopping list","A record of memories, effort, and the story so far","A cooking certificate","A university transcript"],correct:1,why:"It's a personal archive of how you became us."},
    {cat:"FINAL CHECK",q:"If the question was “Will you grow with me?”, what is the hope for the answer over time?",a:["Only if everything is easy","Yes — continuing to grow, learn, and choose each other","No more questions ever","The investigation must end today"],correct:1,why:"The hope is to keep growing, learning, and choosing each other."}
  ];

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("show"), 2800);
  }

  function showView(viewId) {
    if (viewId === "final" && !missionUnlocked) {
      showToast("FINAL FILE LOCKED — complete Mission 24 first.");
      return;
    }
    $$(".view").forEach(view => {
      view.classList.toggle("active", view.id === viewId);
      view.setAttribute("aria-hidden", view.id === viewId ? "false" : "true");
    });
    currentView = viewId;
    footer.classList.toggle("hidden", viewId === "final");
    $("#siteHeader").classList.toggle("hidden", viewId !== "dashboard");
    $("#mobileMenu").classList.remove("active");
    window.scrollTo({top:0,behavior:"smooth"});
    if (viewId === "mission" && quizIndex === 0 && !answerConfirmed) renderQuestion();
  }

  function renderFile(index) {
    currentFileIndex = index;
    const file = fileData[index];
    $("#fileCode").textContent = `FILE ${file.id} / 2910`;
    let sections = file.sections.map(([num,label,paragraphs]) => `
      <article class="case-story">
        <div class="story-label"><span>${num}</span><span>${label}</span></div>
        <div class="story-text">${paragraphs.map((p,i) => `<p class="${p.startsWith("“") ? "big-line" : (p.length < 65 && (p.endsWith(".") || p.endsWith("…")) ? "" : "")}">${escapeHTML(p)}</p>`).join("")}</div>
      </article>`).join("");
    const attributes = index === 5 ? `<div class="attribute-chips">${[
      ["SMART","I admire your mind and the way you think. I love that you are intelligent, curious, and able to look at things from your own perspective. It is one of the qualities that made me admire you, and it is still something I appreciate about you."],
      ["KIND","One thing that surprised me about you is how kind you can be even to people you are not close to. Your consideration is not limited to people who can do something for you or people already in your circle. I notice that, and it makes me respect you even more."],
      ["LOVING","You make an effort to make me happy, and I do not take that for granted. I see it in the little things, in the thought you put into making me feel remembered, and in the ways you try to show up for me even when we are apart. Those things make me feel loved."],
      ["HARDWORKING","I admire the effort you put into your responsibilities and the life you are building. I see someone who keeps moving, takes his work seriously, and is willing to put in effort for the things that matter. I hope you remember to give yourself credit for how far you have come."],
      ["FAITHFUL","Your faithfulness matters to me. I value the commitment, trust, and steadiness that help make a relationship meaningful. It is not only about saying the right things; it is about continuing to choose what matters and treating that commitment with care."],
      ["LOVES GOD","I love that your relationship with God is part of who you are. Your faith matters, and I admire that this is an important part of your life. I hope you keep growing in your walk with God and that it continues to shape you into the man you want to become."]
    ].map(([name,desc])=>`<button class="attribute-chip" type="button" data-attribute="${name}" data-description="${desc.replace(/&/g,"&amp;").replace(/"/g,"&quot;")}">${name}</button>`).join("")}</div><div class="attribute-message" id="attributeMessage" aria-live="polite"><p>Select a quality above. Its full note will appear here.</p></div>` : "";
    $("#fileContent").innerHTML = `
      <div class="case-heading"><p class="dashboard-label">${file.eyebrow}</p><h2>${escapeHTML(file.title.split(" ")[0])}<br><em>${escapeHTML(file.title.split(" ").slice(1).join(" "))}</em></h2></div>
      <div class="case-meta"><div><span>DATE</span><strong>${file.date}</strong></div><div><span>LOCATION</span><strong>${file.location}</strong></div><div><span>STATUS</span><strong>${file.status}</strong></div></div>
      <div class="question-reveal"><p class="reveal-label">KEY FINDING</p><blockquote>${escapeHTML(file.quote)}</blockquote><p class="question-note">${escapeHTML(file.note)}</p></div>
      ${attributes}${sections}
      ${index === 0 ? `<div class="story-media-placeholder"><div class="story-media-heading"><span>VIDEO EVIDENCE / 001</span><p>A memory from the beginning.</p></div><video class="story-video" controls playsinline preload="metadata" aria-label="Video for The Question"><source src="the-question-video.mp4" type="video/mp4">Your browser does not support this video.</video></div>` : index === 1 ? `<div class="story-media-placeholder"><div class="story-media-heading"><span>VIDEO EVIDENCE / 002</span><p>The Omu-Aran → Ilorin memory.</p></div><video class="story-video" controls playsinline preload="metadata" aria-label="Video for The Journey"><source src="the-journey-video.mp4" type="video/mp4">Your browser does not support this video.</video></div>` : index === 2 ? `<div class="story-media-placeholder"><div class="story-media-heading"><span>PHOTO EVIDENCE / 003</span><p>A thoughtful gift, and the effort behind it.</p></div><img class="story-photo" src="evidence-of-love.jpg" alt="A fragrance gift with a handwritten love note"></div>` : index === 3 ? `<div class="story-media-placeholder"><div class="story-media-heading"><span>PHOTO EVIDENCE / 004</span><p>A reminder of us, even across the distance.</p></div><img class="story-photo" src="distance-memory.jpg" alt="A photograph of us together"></div>` : `<div class="story-photo-placeholder"><span>PHOTO EVIDENCE</span><p>A place for a memory we can keep.</p><small>OPTIONAL PHOTO TO BE ADDED</small></div>`}
      <div class="case-result"><span>CASE RESULT</span><h3>${escapeHTML(file.result)}</h3><p>${file.id} / 008 — SHEGEH // 24</p></div>
      <div class="file-note">${file.ending.map((line,i)=>`<p class="${i===file.ending.length-1?"note-emphasis":""}">${escapeHTML(line)}</p>`).join("")}</div>`;
    $("#nextFileButton").textContent = index === fileData.length-1 ? "RETURN TO ARCHIVE →" : `FILE ${fileData[index+1].id} — ${fileData[index+1].title.toUpperCase()} →`;
    $("#nextFileButton").onclick = () => index === fileData.length-1 ? showView("archive") : renderFile(index+1);
    showView("individualFile");
  }

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
  }

  // Subtle UI click sound generated in the browser (no extra sound file needed).
  let soundContext;
  let lastClickSoundAt = 0;
  function playClickSound() {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      soundContext = soundContext || new AudioContextClass();
      if (soundContext.state === "suspended") soundContext.resume();
      const now = soundContext.currentTime;
      const oscillator = soundContext.createOscillator();
      const gain = soundContext.createGain();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(1150, now);
      oscillator.frequency.exponentialRampToValueAtTime(720, now + 0.035);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.055, now + 0.004);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.055);
      oscillator.connect(gain);
      gain.connect(soundContext.destination);
      oscillator.start(now);
      oscillator.stop(now + 0.06);
    } catch (error) {
      // The website remains usable if the browser does not support sound effects.
    }
  }

  const backgroundMusic = $("#backgroundMusic");
  const musicToggle = $("#musicToggle");
  const musicToggleLabel = $("#musicToggleLabel");
  let musicOn = false;
  backgroundMusic.volume = 0.12; // Soft background volume.
  function updateMusicControl() {
    musicToggle.setAttribute("aria-pressed", String(musicOn));
    musicToggle.classList.toggle("is-playing", musicOn);
    musicToggleLabel.textContent = musicOn ? "MUSIC ON" : "MUSIC OFF";
  }
  async function startBackgroundMusic() {
    try {
      backgroundMusic.volume = 0.12;
      await backgroundMusic.play();
      musicOn = true;
      updateMusicControl();
    } catch (error) {
      musicOn = false;
      updateMusicControl();
      showToast("Add your licensed 'belong-together.mp3' file to the website folder to enable the soundtrack.");
    }
  }
  musicToggle.addEventListener("click", async () => {
    if (musicOn) {
      backgroundMusic.pause();
      musicOn = false;
      updateMusicControl();
      return;
    }
    await startBackgroundMusic();
  });
  backgroundMusic.addEventListener("error", () => {
    musicOn = false;
    updateMusicControl();
  });
  // Any button or button-like control gets a short, quiet click sound.
  document.addEventListener("click", event => {
    const control = event.target.closest("button, [role=button]");
    if (!control || control.disabled) return;
    const now = Date.now();
    if (now - lastClickSoundAt < 45) return;
    lastClickSoundAt = now;
    playClickSound();
  }, true);

  $("#enterButton").addEventListener("click", () => {
    openingScreen.classList.add("hidden");
    mainSite.classList.remove("hidden");
    showView("dashboard");
    // Browsers allow music to begin after the visitor's first deliberate click.
    startBackgroundMusic();
  });
  $$("[data-view]").forEach(button => button.addEventListener("click", () => showView(button.dataset.view)));
  $$("[data-file]").forEach(button => button.addEventListener("click", () => renderFile(fileIds.indexOf(button.dataset.file))));
  $("#mobileMenu").addEventListener("click", () => {
    showView(currentView === "dashboard" ? "archive" : "dashboard");
  });
  $("#replayButton").addEventListener("click", () => {
    openingScreen.classList.remove("hidden");
    mainSite.classList.add("hidden");
    showView("dashboard");
  });

  function renderQuestion() {
    const q = quizQuestions[quizIndex];
    selectedAnswer = null;
    answerConfirmed = false;
    $("#questionCounter").textContent = `QUESTION ${String(quizIndex+1).padStart(2,"0")} / 24`;
    $("#quizScore").textContent = `SCORE: ${quizScore}`;
    $("#quizProgress").style.width = `${(quizIndex/quizQuestions.length)*100}%`;
    $("#quizCategory").textContent = q.cat;
    $("#quizQuestion").textContent = q.q;
    $("#quizFeedback").textContent = "";
    $("#quizFeedback").className = "quiz-feedback";
    $("#nextQuestionButton").disabled = true;
    $("#nextQuestionButton").textContent = "CONFIRM ANSWER →";
    $("#answerList").innerHTML = q.a.map((answer,i) => `<button class="answer-option" data-answer="${i}"><span class="option-letter">${String.fromCharCode(65+i)}</span><span>${escapeHTML(answer)}</span></button>`).join("");
    $$(".answer-option").forEach(button => button.addEventListener("click", () => {
      if (answerConfirmed) return;
      selectedAnswer = Number(button.dataset.answer);
      $$(".answer-option").forEach(option => option.classList.toggle("selected", option === button));
      $("#nextQuestionButton").disabled = false;
    }));
  }

  $("#nextQuestionButton").addEventListener("click", () => {
    if (answerConfirmed || selectedAnswer === null) return;
    const q = quizQuestions[quizIndex];
    answerConfirmed = true;
    const correct = selectedAnswer === q.correct;
    if (correct) quizScore++;
    $$(".answer-option").forEach((button,i) => {
      button.disabled = true;
      if (i === q.correct) button.classList.add("correct");
      if (i === selectedAnswer && !correct) button.classList.add("wrong");
    });
    $("#quizScore").textContent = `SCORE: ${quizScore}`;
    $("#quizFeedback").textContent = (correct ? "CORRECT. " : "NOT QUITE. ") + q.why;
    $("#quizFeedback").className = `quiz-feedback ${correct ? "good" : "bad"}`;
    $("#quizProgress").style.width = `${((quizIndex+1)/quizQuestions.length)*100}%`;
    $("#nextQuestionButton").disabled = true;
    $("#nextQuestionButton").textContent = quizIndex === quizQuestions.length-1 ? "MISSION COMPLETE — PREPARING RESULTS…" : "ANSWER RECORDED…";
    // Briefly show the explanation, then advance automatically so the player never gets stuck on a second click.
    window.setTimeout(() => {
      if (quizIndex < quizQuestions.length-1) {
        quizIndex++;
        renderQuestion();
      } else {
        finishMission();
      }
    }, 1100);
  });

  function finishMission() {
    const percent = Math.round((quizScore/quizQuestions.length)*100);
    missionUnlocked = true;
    $("#finalFileCard").classList.remove("locked");
    $("#finalFileCard").classList.add("unlocked");
    $("#finalFileCard").setAttribute("aria-disabled","false");
    $("#finalLock").textContent = "✓";
    $("#finalCardDescription").textContent = "Unlocked. Your final finding awaits.";
    $("#missionPanel").classList.add("hidden");
    const result = $("#missionResult");
    result.classList.remove("hidden");
    let verdict = percent === 100 ? "EXPERT WITNESS." : percent >= 75 ? "STRONG CASE." : percent >= 50 ? "PROMISING EVIDENCE." : "INVESTIGATION IN PROGRESS.";
    result.innerHTML = `<p class="dashboard-label">MISSION 24 / COMPLETE</p><h3>${verdict}</h3><p>You scored <strong>${quizScore} / 24 (${percent}%)</strong>.</p><p>${percent===100?"Every detail accounted for. Suspiciously impressive.":percent>=75?"You have been paying attention. The evidence is strong.":"Some of the files may deserve another visit. Luckily, the archive is open."}</p><button class="button button-light" id="unlockFinalButton">OPEN THE FINAL FILE →</button><button class="button button-outline" id="retryMissionButton" style="margin-left:8px">RETRY MISSION ↺</button>`;
    $("#unlockFinalButton").addEventListener("click", () => showView("final"));
    $("#retryMissionButton").addEventListener("click", resetMission);
    showToast("Mission complete. The Final File is now unlocked.");
  }

  function resetMission() {
    quizIndex = 0; quizScore = 0; selectedAnswer = null; answerConfirmed = false;
    $("#missionPanel").classList.remove("hidden");
    $("#missionResult").classList.add("hidden");
    renderQuestion();
  }

  $$(".formula-term").forEach(term => term.addEventListener("click", () => {
    $$(".formula-term").forEach(item => item.classList.toggle("selected", item === term));
    const data = {
      C:["C / CARING","CONSIDERATION","You pay attention to the things that make me happy and make an effort to show that you care. It is in the little gestures, the thought you put into me, and the way you try to make me feel remembered. I notice those things, even when they might seem small to you."],
      L:["L / LOVE","LOVE","Your love has shown up in so many little ways, especially in the effort you make to make me happy. The gifts you sent for my birthday and Valentine’s Day, even from wherever you were, made me feel remembered and considered. It is the thought behind those gestures that stays with me."],
      K:["K / KINDNESS","KINDNESS","One of the things that surprised me about you is that your kindness extends to people you are not even close to. You do not have to reserve consideration only for people you love or people who can repay you. That quality says a lot about your character, and I genuinely admire it."],
      H:["H / HARDWORKING","HARDWORKING","I admire how you keep showing up for your responsibilities and putting effort into the life you are building. I see your determination and the work you put in, even when things are not effortless. I hope you are proud of yourself, too, because your effort deserves to be recognised."],
      P:["P / PECULIARITIES","A VERY SPECIFIC VARIABLE","The suspicious sniffing while eating food that is not even peppery, the chef energy, and all the little habits that make you unmistakably you. These details may not be scientifically relevant, but they are part of the person I know and love — and they make this investigation much more entertaining."]
    };
    const [code,title,description] = data[term.dataset.term];
    $("#variableDetails").innerHTML = `<span class="variable-code">${code}</span><h3>${title}</h3><p>${description}</p>`;
  }));

  $("#chefUnavailable").addEventListener("click", () => {
    $("#kitchenMessage").textContent = "REQUEST RECEIVED. Chef is currently unavailable. He is probably watching an anime.";
  });

  $("#classifiedForm").addEventListener("submit", event => {
    event.preventDefault();
    const value = $("#classifiedPassword").value.trim().toLowerCase().replace(/[’‘]/g,"'").replace(/[.!?]+$/,"").replace(/\s+/g," ");
    if (value === "i'll penetrate him" || value === "i’ll penetrate him" || value === "ill penetrate him" || value === "i will penetrate him") {
      $("#classifiedReveal").classList.remove("hidden");
      $("#classifiedFeedback").textContent = "Clearance verified. This file is now open on this device.";
      $("#classifiedFeedback").className = "quiz-feedback good";
      $("#classifiedPassword").value = "";
    } else {
      $("#classifiedFeedback").textContent = "ACCESS DENIED. Try the private phrase only the two of you understand.";
      $("#classifiedFeedback").className = "quiz-feedback bad";
    }
  });

  document.addEventListener("click", event => {
    const chip = event.target.closest("[data-attribute]");
    if (!chip) return;
    const message = $("#attributeMessage");
    if (message) {
      $$(".attribute-chip").forEach(item => item.classList.toggle("selected", item === chip));
      message.innerHTML = `<h3>${escapeHTML(chip.dataset.attribute)}</h3><p>${escapeHTML(chip.dataset.description)}</p>`;
    }
  });

  // Start with a clean dashboard state behind the opening screen.
  $("#finalFileCard").addEventListener("click", () => {
    if (!missionUnlocked) showToast("FINAL FILE LOCKED — complete Mission 24 first.");
  });
})();