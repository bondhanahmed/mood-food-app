const { LanguageServiceClient } = require('@google-cloud/language');
const client = new LanguageServiceClient();
const moodKeywordsMap = require('./moodKeywordsMap');

async function analyseMoodText(text) {
    const document = {
        content: text,
        type: 'PLAIN_TEXT',
    };

    // Sentiment analysis
    const [sentimentResult] = await client.analyzeSentiment({ document });
    const sentimentScore = sentimentResult.documentSentiment.score;

    // Entity sentiment analysis
    const [entitySentimentResult] = await client.analyzeEntitySentiment({ document });

    const extractedKeywords = entitySentimentResult.entities
    .map(entity => entity.name.toLowerCase())
    .filter((word, index, self) => word.length > 2 && self.indexOf(word) === index);

    // Fallback mood detection based on keyword presence
    const fallbackMatch = Object.keys(moodKeywordsMap).find(mood =>
        text.toLowerCase().includes(mood)
    );

    // Sentiment-based fallback if no keywords match
    const inferredMood = fallbackMatch || inferMoodFromSentiment(sentimentScore);

    const mappedFoods = moodKeywordsMap[inferredMood] || [];

    return {
        mood: inferredMood,
        foods: mappedFoods,
        extractedKeywords,
        sentimentScore,
    };
}

// Helper function to infer mood from sentiment score
function inferMoodFromSentiment(score) {
    if (score >= 0.3) return 'happy';
    if (score <= -0.3) return 'sad';
    return 'neutral';
}

module.exports = {
  analyseMoodText
};
