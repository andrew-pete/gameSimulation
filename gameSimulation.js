const GOAL_AVG = 3;
const PLAYERS_ASIDE = 18;
const SECONDS_PER_GAME = 60 * 60;
const SEASON_LENGTH = 82;

const TEAM_WIN_PROB = 0.50;

const PLAYER_SCORE_CDF = [
    0.01,
    0.03,
    0.05,
    0.08,
    0.11,
    0.15,
    0.20,
    0.25,
    0.30,
    0.35,
    0.40,
    0.45,
    0.50,
    0.55,
    0.6,
    0.65,
    0.70,
    1.
];

function getPlayerScoreIdx() {
    const r = Math.random();
    for (let i = 0; i < PLAYER_SCORE_CDF.length; i++) {
        if (r < PLAYER_SCORE_CDF[i]) {
            return i;
        }
    }
    return i;
}

function simulateGame() {
    const homeGoals = [];
    const awayGoals = [];
    for (let i = 0; i < SECONDS_PER_GAME; i++) {
        if (Math.random() < GOAL_AVG * 2 / SECONDS_PER_GAME) {
            // GOAL
            const home = Math.random() < TEAM_WIN_PROB;
            if (home) {
                const playerIdx = getPlayerScoreIdx();
                // const playerIdx = Math.floor(Math.random() * PLAYERS_ASIDE);
                homeGoals.push(playerIdx);
            } else {
                const playerIdx = getPlayerScoreIdx();
                // const playerIdx = Math.floor(Math.random() * PLAYERS_ASIDE);
                awayGoals.push(playerIdx);
            }
        }
    }
    return {
        homeGoals,
        awayGoals
    };
}

function simulateGames(n) {
    const games = [];
    for (let i = 0; i < n; i++) {
        const gameResults = simulateGame();
        games.push(gameResults);
    }

    return games;
}

function analyzePlayerGames(games, playerIdx) {
    const playerScoredGames = games.filter(({homeGoals}) => homeGoals.includes(playerIdx));
    const [win, loss, tie] = playerScoredGames.reduce((acc, {homeGoals, awayGoals}) => {
        if (homeGoals.length > awayGoals.length) {
            acc[0]++;
        } else if (homeGoals.length < awayGoals.length) {
            acc[1]++;
        } else {
            acc[2]++;
        }
        return acc;
    }, [0, 0, 0]);

    console.log(`Team record was ${win}-${loss}-${tie} when player ${playerIdx} scores`);
    console.log(`That's a win % of ${100 * win / (win + loss)}%`);
}


(function() {
    const games = simulateGames(82);
    analyzePlayerGames(games, 15);
})();


