/*
 * Sentiment Model
 *
 * Responsibility:
 *      enumeration to model a sentiment type
 * Collaborators:
 *      Returned by Tag.sentimentType
 */

define(function() {

    var Sentiment = {
        NEGATIVE: -1,
        NEUTRAL: 0,
        POSITIVE: 1,

        fromScore: function(sentimentScore) {
            return sentimentScore < 40 ? Sentiment.NEGATIVE
                : sentimentScore > 60 ? Sentiment.POSITIVE
                : Sentiment.NEUTRAL;
        }
    };

    return Sentiment;
});