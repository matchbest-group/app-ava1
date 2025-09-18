import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend('re_LcuLk8Qz_JgHWm5tnSXk6VcdkdSADBC22')

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      firstName,
      lastName,
      email,
      phone,
      tool,
      message,
      timestamp
    } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Email content
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Contact Form Submission - AVA Suite</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #4B6CEB, #982ACC, #FF6EC7); padding: 30px; border-radius: 10px; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
            <p style="color: #e0e7ff; margin: 10px 0 0 0;">AVA Suite - Get in Touch</p>
          </div>
          
          <div style="background: #f8fafc; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
            <h2 style="color: #1e293b; margin: 0 0 15px 0; font-size: 18px;">Interested Product</h2>
            <div style="background: white; padding: 15px; border-radius: 6px; border-left: 4px solid #4B6CEB;">
              <p style="margin: 0; font-weight: bold; color: #4B6CEB;">${tool}</p>
              <p style="margin: 5px 0 0 0; color: #64748b;">Customer is interested in this product</p>
            </div>
          </div>

          <div style="background: white; padding: 25px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h2 style="color: #1e293b; margin: 0 0 20px 0; font-size: 18px;">Customer Information</h2>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #475569;">Name:</strong>
              <span style="margin-left: 10px; color: #1e293b;">${firstName} ${lastName}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #475569;">Email:</strong>
              <span style="margin-left: 10px; color: #1e293b;">${email}</span>
            </div>
            
            ${phone ? `
            <div style="margin-bottom: 15px;">
              <strong style="color: #475569;">Phone:</strong>
              <span style="margin-left: 10px; color: #1e293b;">${phone}</span>
            </div>
            ` : ''}
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #475569;">Message:</strong>
              <div style="margin-top: 8px; padding: 15px; background: #f1f5f9; border-radius: 6px; color: #1e293b;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
          </div>

          <div style="margin-top: 30px; padding: 20px; background: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <p style="margin: 0; color: #92400e;">
              <strong>Message submitted on:</strong> ${new Date(timestamp).toLocaleString('en-IN', { 
                timeZone: 'Asia/Kolkata',
                dateStyle: 'full',
                timeStyle: 'short'
              })}
            </p>
          </div>

          <div style="margin-top: 30px; text-align: center; color: #64748b; font-size: 14px;">
            <p>This message was sent from the AVA Suite contact form.</p>
          </div>
        </body>
      </html>
    `

    // Send email using Resend
    const fromEmail = process.env.FROM_EMAIL || 'avaone@matchbestsoftware.ae'
    const toEmail = process.env.PRICING_INQUIRY_EMAIL || 'pavan.satpute1@matchbest.ai'
    
    const { data, error } = await resend.emails.send({
      from: `AVA Suite Contact <${fromEmail}>`,
      to: [toEmail],
      subject: `New Contact Form - ${tool} Interest from ${firstName} ${lastName}`,
      html: emailHtml,
      replyTo: email
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        message: 'Email sent successfully',
        emailId: data?.id 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
