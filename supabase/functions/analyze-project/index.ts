import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { idea } = await req.json();

    if (!idea) {
      return new Response(
        JSON.stringify({ error: 'Idea is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'AI service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Analyzing project idea:', idea.substring(0, 100));

    const systemPrompt = `You are an expert software architect and project planner. Analyze the user's project idea and generate a comprehensive project blueprint.

Return a valid JSON object with this exact structure:
{
  "projectType": "website" | "mobile" | "desktop" | "hardware" | "ai",
  "title": "short project title",
  "overview": {
    "problem": "what problem does this solve",
    "solution": "proposed solution description",
    "features": ["feature1", "feature2", "feature3", "feature4", "feature5", "feature6"],
    "assumptions": ["assumption1", "assumption2", "assumption3", "assumption4"]
  },
  "targetUsers": {
    "primary": ["primary user type 1", "primary user type 2", "primary user type 3"],
    "secondary": ["secondary user type 1", "secondary user type 2", "secondary user type 3"],
    "personas": ["persona description 1", "persona description 2", "persona description 3"]
  },
  "techStack": [
    { "name": "tech name", "category": "Frontend|Backend|Database|Infrastructure|Tools", "reason": "why this tech" }
  ],
  "architecture": {
    "components": ["component1", "component2", "component3", "component4", "component5"],
    "relationships": ["relationship description 1", "relationship description 2"]
  },
  "phases": [
    { "name": "phase name", "duration": "X weeks", "tasks": ["task1", "task2", "task3", "task4"] }
  ],
  "risks": [
    { "type": "Technical Risks|Business Risks|Security Risks|Operational Risks", "severity": "low|medium|high", "description": "risk description", "mitigation": "how to mitigate" }
  ],
  "resources": [
    { "title": "resource title", "url": "https://...", "type": "documentation|tutorial|course|repository|article" }
  ],
  "workflow": {
    "phases": [
      {
        "id": "unique-id",
        "name": "Phase Name",
        "duration": "X weeks",
        "description": "Detailed description of what this phase accomplishes and its goals",
        "tools": ["React", "TypeScript", "Figma"],
        "activities": ["activity1", "activity2", "activity3", "activity4"],
        "deliverables": ["deliverable1", "deliverable2"],
        "tasks": [
          { "name": "Task name", "description": "What to do", "priority": "high" },
          { "name": "Task name 2", "description": "What to do", "priority": "medium" }
        ],
        "milestones": ["Milestone 1", "Milestone 2"],
        "dependencies": ["previous-phase-id"],
        "teamSize": "2-3 developers",
        "keyDecisions": ["Technology choices", "Architecture patterns"]
      }
    ]
  }
}

IMPORTANT: Generate 4-6 detailed workflow phases. Include at least 3-4 tasks per phase with priorities. Be specific about tools - use real technology names (React, Node.js, PostgreSQL, Docker, AWS, Figma, etc.). Each phase should have a clear description explaining its purpose.

Be specific and practical. Include real tools and technologies. Make sure all URLs are valid. Return ONLY the JSON object, no markdown formatting.`;

    const response = await fetch(
      'https://ai.gateway.lovable.dev/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${LOVABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-3-flash-preview',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `Analyze this project idea and generate a complete blueprint:\n\n${idea}` }
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Please add credits to continue.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: `AI service error: ${response.status}` }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log('AI response received');

    // Extract the text content from the response
    const textContent = data.choices?.[0]?.message?.content;
    
    if (!textContent) {
      console.error('No text content in response:', JSON.stringify(data));
      return new Response(
        JSON.stringify({ error: 'Failed to generate blueprint' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Clean up the response - remove markdown code blocks if present
    let cleanedContent = textContent
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    // Parse the JSON
    let blueprint;
    try {
      blueprint = JSON.parse(cleanedContent);
    } catch (parseError) {
      console.error('Failed to parse JSON:', parseError, 'Content:', cleanedContent.substring(0, 500));
      return new Response(
        JSON.stringify({ error: 'Failed to parse AI response' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Blueprint generated successfully for:', blueprint.title);

    return new Response(
      JSON.stringify({ success: true, blueprint }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error analyzing project:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
