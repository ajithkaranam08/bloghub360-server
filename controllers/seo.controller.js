import { SeoCheck } from "seord";
const htmlContent = `<h1>Does Progressive Raise Your Rates After 6 Months?</h1><p>When it comes to car insurance, 
finding the right provider...
`
const contentJson = {
    title: 'Does Progressive raise your rates after 6 months?',
    htmlText: htmlContent,
    keyword: 'progressive',
    subKeywords: ['car insurance', 'rates', 'premiums', 'save money', 'US'],
    metaDescription: 'Find out if Progressive raises your rates after 6 months and what factors can impact your insurance premiums. Learn how to save money on car insurance in the US.',
    languageCode: 'en',
    countryCode: 'us'
};

export async function checkSeo(req,res) {
    try {
        console.log("Called Check Seo Function")
        const seoCheck = new SeoCheck(req?.body?.contentJson || contentJson, 'liveinabroad.com');

        // Perform analysis
        const result = await seoCheck.analyzeSeo();
        // Print the result
        console.log(`Warnings: ${result.messages.warnings.length}`);
        result.messages.warnings.forEach((warning) => {
            console.log(`  - ${warning}`);
        });

        console.log(`\nGood Points: ${result.messages.goodPoints.length}`);
        result.messages.goodPoints.forEach((error) => {
            console.log(`  - ${error}`);
        });


        console.log(`\nMinor Warnings: ${result.messages.minorWarnings.length}`);
        result.messages.minorWarnings.forEach((error) => {
            console.log(`  - ${error}`);
        });

        console.log("\nSEO Score: " + result.seoScore);
        console.log(`Keyword SEO Score: ${result.keywordSeoScore}`);
        console.log(`Keyword Density: ${result.keywordDensity}`);
        console.log(`Sub Keyword Density: ${result.subKeywordDensity.map((subKeywordDensity) => {
            return `(${subKeywordDensity.keyword} ${subKeywordDensity.density})`;
        })}`);
        console.log(`Keyword Frequency: ${result.keywordFrequency}`);
        console.log(`Word Count: ${result.wordCount}`);
        console.log(`Total Links: ${result.totalLinks}`);

        return res.json({
            success: true,
            payload: result,
          });
      
    } catch (error) {
        throw error
    }
}