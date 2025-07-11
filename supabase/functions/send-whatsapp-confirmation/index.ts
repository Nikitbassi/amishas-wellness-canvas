
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { phoneNumber, fullName, selectedSlot, formData } = await req.json();
    
    console.log('Sending WhatsApp confirmation for:', { phoneNumber, fullName, selectedSlot });

    // Get MSG91 credentials from environment
    const authKey = Deno.env.get('MSG91_AUTH_KEY');
    const templateId = Deno.env.get('MSG91_WHATSAPP_TEMPLATE_ID');

    if (!authKey || !templateId) {
      console.error('MSG91 credentials missing:', { authKey: !!authKey, templateId: !!templateId });
      throw new Error('MSG91 credentials not configured');
    }

    // Format phone number (ensure it starts with country code)
    let formattedPhone = phoneNumber.replace(/\D/g, ''); // Remove non-digits
    if (!formattedPhone.startsWith('91') && formattedPhone.length === 10) {
      formattedPhone = '91' + formattedPhone; // Add India country code if missing
    }

    console.log('Formatted phone number:', formattedPhone);

    // Prepare the WhatsApp message data for MSG91
    const messageData = {
      template_id: templateId,
      short_url: "0",
      realTimeResponse: "1",
      recipients: [
        {
          mobiles: formattedPhone,
          var1: fullName,
          var2: selectedSlot,
          var3: formData.healthGoals || "General consultation"
        }
      ]
    };

    console.log('Sending message data:', JSON.stringify(messageData, null, 2));

    // Send WhatsApp message via MSG91
    const response = await fetch('https://control.msg91.com/api/v5/whatsapp/whatsapp-outbound-message/bulk/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authkey': authKey,
      },
      body: JSON.stringify(messageData)
    });

    const result = await response.text();
    console.log('MSG91 Response status:', response.status);
    console.log('MSG91 Response body:', result);

    let parsedResult;
    try {
      parsedResult = JSON.parse(result);
    } catch (e) {
      console.error('Failed to parse MSG91 response:', e);
      parsedResult = { message: result };
    }

    if (!response.ok) {
      console.error('MSG91 API error:', parsedResult);
      throw new Error(`MSG91 API error: ${parsedResult.message || 'Unknown error'}`);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'WhatsApp confirmation sent successfully',
        response: parsedResult
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
