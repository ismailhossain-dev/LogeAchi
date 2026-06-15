export async function POST(req){
    try {
        const wishlist = await req.json();
        console.log("wishlit inforamtion", wishlist);
    } catch (error) {
        
    }
}