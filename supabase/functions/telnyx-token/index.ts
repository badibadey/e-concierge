import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    const TELNYX_API_KEY = Deno.env.get('TELNYX_API_KEY');
    const TELNYX_CREDENTIAL_ID = Deno.env.get('TELNYX_CREDENTIAL_ID');

    if (!TELNYX_API_KEY) {
      throw new Error('Missing TELNYX_API_KEY environment variable');
    }

    if (!TELNYX_CREDENTIAL_ID) {
      throw new Error('Missing TELNYX_CREDENTIAL_ID environment variable');
    }

    const response = await fetch(
      `https://api.telnyx.com/v2/telephony_credentials/${TELNYX_CREDENTIAL_ID}/token`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${TELNYX_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Telnyx API error (${response.status}): ${
          errorData.errors?.[0]?.detail || response.statusText
        }`
      );
    }

    const token = await response.text();

    return new Response(JSON.stringify({ token }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error generating token:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Failed to generate token',
        details: error instanceof Error ? error.stack : undefined
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});