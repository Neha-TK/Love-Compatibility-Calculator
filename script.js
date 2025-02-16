document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculateBtn');
    const result = document.getElementById('result');
    const progressFill = document.getElementById('progressFill');
    const percentage = document.getElementById('percentage');
    const message = document.getElementById('message');
    const compatibility = document.getElementById('compatibility');
    const loveStory = document.getElementById('loveStory');
    const storyText = document.getElementById('storyText');
    const loveLetter = document.getElementById('loveLetter');
    const letterText = document.getElementById('letterText');
    const loveQuote = document.getElementById('loveQuote');
    const quoteText = document.getElementById('quoteText');
    const happyMusic = document.getElementById('happyMusic');
    const sadMusic = document.getElementById('sadMusic');
    const toggleHappyMusic = document.getElementById('toggleHappyMusic');
    const toggleSadMusic = document.getElementById('toggleSadMusic');

    let currentMusic = null;

    const zodiacCompatibility = {
        fire: ['aries', 'leo', 'sagittarius'],
        earth: ['taurus', 'virgo', 'capricorn'],
        air: ['gemini', 'libra', 'aquarius'],
        water: ['cancer', 'scorpio', 'pisces']
    };

    const loveQuotes = [
        "Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day.",
        "The best thing to hold onto in life is each other.",
        "I love you not only for what you are, but for what I am when I am with you.",
        "Love is composed of a single soul inhabiting two bodies.",
        "In all the world, there is no heart for me like yours.",
        "I have found the one whom my soul loves."
    ];

    function getZodiacElement(sign) {
        for (const [element, signs] of Object.entries(zodiacCompatibility)) {
            if (signs.includes(sign)) return element;
        }
        return null;
    }

    function calculateZodiacCompatibility(sign1, sign2) {
        if (!sign1 || !sign2) return 0;
        const element1 = getZodiacElement(sign1);
        const element2 = getZodiacElement(sign2);

        if (element1 === element2) return 30;
        if (
            (element1 === 'fire' && element2 === 'air') ||
            (element1 === 'air' && element2 === 'fire') ||
            (element1 === 'earth' && element2 === 'water') ||
            (element1 === 'water' && element2 === 'earth')
        ) return 25;
        return 15;
    }

    function generateLoveStory(name1, name2, score) {
        const stories = [
            `Under a starlit sky, ${name1} and ${name2} first crossed paths at a local café. Their eyes met over steaming cups of coffee, and time seemed to stand still. What started as a chance encounter blossomed into a beautiful connection that would change their lives forever.`,
            `${name1} had always believed in fate, but never more so than when they met ${name2} during a summer festival. The twinkling lights and soft music created the perfect backdrop for their magical first meeting. From that moment on, their hearts beat as one.`,
            `In a world of endless possibilities, ${name1} and ${name2} found each other through a series of serendipitous events. Their love story began with a simple smile, grew through shared laughter, and continues to flourish with each passing day.`
        ];
        return stories[Math.floor(Math.random() * stories.length)];
    }

    function generateLoveLetter(name1, name2, score) {
        const letters = [
            `Dearest ${name2},\n\nMy heart skips a beat every time I think of you. You are the sunshine that brightens my darkest days, the melody to my favorite song, and the missing piece to my puzzle. Every moment spent with you feels like a dream I never want to wake up from.\n\nForever yours,\n${name1}`,
            `My beloved ${name2},\n\nWords cannot express the depth of my feelings for you. You make my world complete with your smile, and your laugh is the sweetest music to my ears. I cherish every second we spend together.\n\nWith all my love,\n${name1}`,
            `Dear ${name2},\n\nFrom the moment I first saw you, I knew you were special. Your presence in my life has made everything brighter, more meaningful, and more beautiful. You are my inspiration, my joy, and my greatest adventure.\n\nYours truly,\n${name1}`
        ];
        return letters[Math.floor(Math.random() * letters.length)];
    }

    function getLoveMessage(score) {
        if (score >= 90) return "Soulmates! Written in the stars! ✨";
        if (score >= 80) return "A match made in heaven! 💫";
        if (score >= 70) return "Strong potential for true love! 💝";
        if (score >= 60) return "There's definitely a spark! ⚡";
        if (score >= 50) return "Worth giving it a shot! 🎯";
        if (score >= 40) return "Friends first, maybe more later! 🤝";
        if (score >= 30) return "Keep looking, but never say never! 🔍";
        if (score >= 20) return "Better as friends! 🫂";
        return "The stars aren't aligned... yet! 🌟";
    }

    function toggleMusic(audio, button) {
        if (currentMusic && currentMusic !== audio) {
            currentMusic.pause();
            currentMusic.currentTime = 0;
            document.querySelectorAll('.music-btn').forEach(btn => btn.classList.remove('playing'));
        }

        if (audio.paused) {
            audio.play();
            button.classList.add('playing');
            currentMusic = audio;
        } else {
            audio.pause();
            audio.currentTime = 0;
            button.classList.remove('playing');
            currentMusic = null;
        }
    }

    toggleHappyMusic.addEventListener('click', () => toggleMusic(happyMusic, toggleHappyMusic));
    toggleSadMusic.addEventListener('click', () => toggleMusic(sadMusic, toggleSadMusic));

    calculateBtn.addEventListener('click', () => {
        const name1 = document.getElementById('name1').value.trim();
        const name2 = document.getElementById('name2').value.trim();
        const zodiac1 = document.getElementById('zodiac1').value;
        const zodiac2 = document.getElementById('zodiac2').value;

        if (!name1 || !name2 || !zodiac1 || !zodiac2) {
            alert('Please fill in all fields!');
            return;
        }

        // Reset previous results
        result.classList.add('hidden');
        loveStory.classList.add('hidden');
        loveLetter.classList.add('hidden');
        loveQuote.classList.add('hidden');

        // Calculate love score
        const baseScore = Math.floor(Math.random() * 51);
        const nameLength = Math.abs(name1.length - name2.length);
        const commonLetters = [...new Set(name1.toLowerCase())].filter(letter => 
            name2.toLowerCase().includes(letter)
        ).length;
        
        const zodiacScore = calculateZodiacCompatibility(zodiac1, zodiac2);
        
        let finalScore = baseScore;
        finalScore += (commonLetters * 3);
        finalScore -= (nameLength * 2);
        finalScore += zodiacScore;
        finalScore = Math.min(100, Math.max(0, finalScore));

        // Animate results
        result.classList.remove('hidden');
        progressFill.style.width = '0%';
        percentage.textContent = '0%';

        // Create typing effect for story and letter
        function typeText(element, text, delay = 50) {
            let index = 0;
            element.textContent = '';
            const interval = setInterval(() => {
                element.textContent += text[index];
                index++;
                if (index >= text.length) clearInterval(interval);
            }, delay);
        }

        setTimeout(() => {
            progressFill.style.width = `${finalScore}%`;
            percentage.textContent = `${finalScore}%`;
            message.textContent = getLoveMessage(finalScore);
            compatibility.textContent = `Zodiac Compatibility: ${zodiacScore}% boost!`;

            // Show and animate additional content
            setTimeout(() => {
                loveStory.classList.remove('hidden');
                typeText(storyText, generateLoveStory(name1, name2, finalScore));

                setTimeout(() => {
                    loveLetter.classList.remove('hidden');
                    typeText(letterText, generateLoveLetter(name1, name2, finalScore));

                    setTimeout(() => {
                        loveQuote.classList.remove('hidden');
                        typeText(quoteText, loveQuotes[Math.floor(Math.random() * loveQuotes.length)]);
                    }, 1000);
                }, 1000);
            }, 1000);

            // Play appropriate music based on score
            if (finalScore >= 70) {
                toggleMusic(happyMusic, toggleHappyMusic);
            } else if (finalScore < 40) {
                toggleMusic(sadMusic, toggleSadMusic);
            }
        }, 1000);
    });
});