const buildMail = (order) => {
  // Función para formatear el precio
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Construir la sección de productos
  const productsHTML = order.detalles
    .map(
      (detalle) => `
    <tr>
      <td style="padding: 20px 0; border-bottom: 1px solid #f0f0f0;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px;">
          <tr>
            <td width="100" style="padding: 15px;" valign="top">
              <img src="${detalle.producto.imagen}" alt="${detalle.producto.nombre}" width="100" height="100" style="border-radius: 8px;">
            </td>
            <td style="padding: 15px;" valign="top">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <h3 style="font-family: arial, 'helvetica neue', helvetica, sans-serif; font-size: 16px; color: #333333; margin: 0 0 5px 0;">
                      ${detalle.producto.nombre}
                    </h3>
                    <p style="font-family: arial, 'helvetica neue', helvetica, sans-serif; font-size: 14px; color: #666666; margin: 0 0 5px 0;">
                      ${detalle.producto.marca}
                    </p>
                    <p style="font-family: arial, 'helvetica neue', helvetica, sans-serif; font-size: 14px; color: #666666; margin: 0;">
                      Cantidad: ${detalle.cantidad}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `,
    )
    .join('');

  // Construir el resumen de la compra solo con el total
  const orderSummaryHTML = `
    <tr>
      <td style="padding-top: 20px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="font-family: arial, 'helvetica neue', helvetica, sans-serif; font-size: 16px; color: #333333; padding: 15px 0;">
              <strong>Total</strong>
            </td>
            <td align="right" style="font-family: arial, 'helvetica neue', helvetica, sans-serif; font-size: 16px; color: #333333;">
              <strong>$${formatPrice(order.monto_total)}</strong>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `;

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="x-apple-disable-message-reformatting">
    <meta content="IE=edge" http-equiv="X-UA-Compatible">
    <meta content="telephone=no" name="format-detection">
    <title></title>
    <style type="text/css">
      /* CONFIG STYLES Please do not delete and edit CSS styles below */ /* IMPORTANT THIS STYLES MUST BE ON FINAL EMAIL */ #outlook a { padding: 0; } .es-button { text-decoration: none !important; } a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; } .es-desk-hidden { display: none; float: left; overflow: hidden; width: 0; max-height: 0; line-height: 0; } /* END OF IMPORTANT */ s { text-decoration: line-through; } body { width: 100%; font-family: arial, 'helvetica neue', helvetica, sans-serif; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; } table { border-collapse: collapse; border-spacing: 0px; } table td, body, .es-wrapper { padding: 0; Margin: 0; } .es-content, .es-header, .es-footer { table-layout: fixed !important; width: 100%; } img { display: block; border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; } p, hr { Margin: 0; } h1, h2, h3, h4, h5 { Margin: 0; line-height: 120%; font-family: arial, 'helvetica neue', helvetica, sans-serif; } p, ul li, ol li, a { -webkit-text-size-adjust: none; -ms-text-size-adjust: none; } .es-left { float: left; } .es-right { float: right; } .es-p5 { padding: 5px; } .es-p5t { padding-top: 5px; } .es-p5b { padding-bottom: 5px; } .es-p5l { padding-left: 5px; } .es-p5r { padding-right: 5px; } .es-p10 { padding: 10px; } .es-p10t { padding-top: 10px; } .es-p10b { padding-bottom: 10px; } .es-p10l { padding-left: 10px; } .es-p10r { padding-right: 10px; } .es-p15 { padding: 15px; } .es-p15t { padding-top: 15px; } .es-p15b { padding-bottom: 15px; } .es-p15l { padding-left: 15px; } .es-p15r { padding-right: 15px; } .es-p20 { padding: 20px; } .es-p20t { padding-top: 20px; } .es-p20b { padding-bottom: 20px; } .es-p20l { padding-left: 20px; } .es-p20r { padding-right: 20px; } .es-p25 { padding: 25px; } .es-p25t { padding-top: 25px; } .es-p25b { padding-bottom: 25px; } .es-p25l { padding-left: 25px; } .es-p25r { padding-right: 25px; } .es-p30 { padding: 30px; } .es-p30t { padding-top: 30px; } .es-p30b { padding-bottom: 30px; } .es-p30l { padding-left: 30px; } .es-p30r { padding-right: 30px; } .es-p35 { padding: 35px; } .es-p35t { padding-top: 35px; } .es-p35b { padding-bottom: 35px; } .es-p35l { padding-left: 35px; } .es-p35r { padding-right: 35px; } .es-p40 { padding: 40px; } .es-p40t { padding-top: 40px; } .es-p40b { padding-bottom: 40px; } .es-p40l { padding-left: 40px; } .es-p40r { padding-right: 40px; } .es-menu td { border: 0; } .es-menu td a img { display: inline-block !important; vertical-align: middle; } /* END CONFIG STYLES */ /* RESPONSIVE STYLES Please do not delete and edit CSS styles below. If you don't need responsive layout, please delete this section. */ @media only screen and (max-width: 600px) { p, ul li, ol li, a { line-height: 150% !important; } h1, h2, h3, h1 a, h2 a, h3 a { line-height: 120% !important; } h1 { font-size: 36px !important; text-align: left; } h2 { font-size: 26px !important; text-align: left; } h3 { font-size: 20px !important; text-align: left; } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size: 36px !important; text-align: left; } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size: 26px !important; text-align: left; } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size: 20px !important; text-align: left; } .es-menu td a { font-size: 12px !important; } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size: 14px !important; } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size: 14px !important; } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size: 14px !important; } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size: 12px !important; } *[class="gmail-fix"] { display: none !important; } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align: center !important; } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align: right !important; } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align: left !important; } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display: inline !important; } }
    </style>
    <!--[if (mso 16)]>
      <style type="text/css">
      a {text-decoration: none;}
      </style>
      <![endif]-->
    <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
    <!--[if gte mso 9]>
  <xml>
      <o:OfficeDocumentSettings>
      <o:AllowPNG></o:AllowPNG>
      <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
    <!--[if !mso]><!-- -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Playfair+Display:400,400i,700,700i">
    <!--<![endif]-->
  </head>
  <body data-new-gr-c-s-loaded="14.1107.0">
    <div class="es-wrapper-color">
      <!--[if gte mso 9]>
        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
          <v:fill type="tile" color="#fafafa"></v:fill>
        </v:background>
      <![endif]-->
      <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
        <tbody>
          <tr>
            <td valign="top" class="esd-email-paddings">
              <!-- Header con Logo -->
              <table align="center" cellpadding="0" cellspacing="0" class="es-header esd-header-popover">
                <tbody>
                  <tr>
                    <td align="center" class="esd-stripe">
                      <table bgcolor="#ffffff" align="center" cellpadding="0" cellspacing="0" width="600" class="es-header-body">
                        <tbody>
                          <tr>
                            <td align="left" class="esd-structure es-p20">
                              <table cellspacing="0" width="100%" cellpadding="0">
                                <tbody>
                                  <tr>
                                    <td align="center" valign="top" width="560" class="es-m-p0r esd-container-frame">
                                      <table cellspacing="0" width="100%" cellpadding="0">
                                        <tbody>
                                          <tr>
                                            <td align="center" class="esd-block-image es-p10b" style="font-size: 0px">
                                              <a href="" target="_blank">
                                                <img width="200" alt="Logo" src="https://i.imgur.com/tTTvwkS.png" title="Logo" style="display: block">
                                              </a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-- Contenido Principal -->
              <table cellspacing="0" align="center" cellpadding="0" class="es-content">
                <tbody>
                  <tr>
                    <td align="center" class="esd-stripe">
                      <table align="center" bgcolor="#ffffff" cellpadding="0" cellspacing="0" width="600" class="es-content-body">
                        <tbody>
                          <tr>
                            <td align="left" class="esd-structure es-p15t es-p20r es-p20l">
                              <table cellpadding="0" cellspacing="0" width="100%">
                                <tbody>
                                  <tr>
                                    <td align="center" valign="top" width="560" class="esd-container-frame">
                                      <table cellpadding="0" cellspacing="0" width="100%">
                                        <tbody>
                                          <tr>
                                            <td align="center" class="esd-block-image es-p10t es-p10b" style="font-size: 0px">
                                              <a target="_blank">
                                                <img alt="" src="https://i.imgur.com/MDzEY1f.png" width="270" style="display: block">
                                              </a>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center" esd-links-underline="none" class="esd-block-text es-p15t es-p15b es-p40r es-p40l es-m-p0r es-m-p0l es-m-txt-c">
                                              <h1 style="font-size: 39px;">
                                                ¡Gracias por tu compra!
                                              </h1>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center" class="esd-block-text es-text-9810 es-p10">
                                              <p class="es-text-mobile-size-16" style="font-size: 16px">
                                                Hemos recibido tu pedido #${order.id_pedido} y está siendo procesado con mucho cuidado. ✨
                                              </p>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>

                          <!-- Detalle de la compra -->
                          <tr>
                            <td align="left" class="esd-structure es-p20r es-p20l" style="background-color: #ffffff; padding: 20px">
                              <table cellpadding="0" cellspacing="0" width="100%">
                                <tbody>
                                  ${productsHTML}
                                  ${orderSummaryHTML}
                                </tbody>
                              </table>
                            </td>
                          </tr>

                          <!-- Mensaje Final -->
                          <tr>
                            <td align="center" class="esd-block-text es-p20">
                              <h3 style="color: #5ea793; font-family: 'playfair display',georgia,'times new roman',serif; font-size: 17px; line-height: 150%;">
                                Gracias por confiar en nosotros para el cuidado de tu piel
                              </h3>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>

              <!-- Footer -->
              <table cellpadding="0" cellspacing="0" align="center" class="es-footer">
                <tbody>
                  <tr>
                    <td align="center" class="esd-stripe">
                      <table cellpadding="0" cellspacing="0" width="600" align="center" class="es-footer-body" style="background-color: transparent">
                        <tbody>
                          <tr>
                            <td align="left" class="esd-structure es-p20t es-p20b es-p20r es-p20l">
                              <table cellpadding="0" cellspacing="0" width="100%">
                                <tbody>
                                  <tr>
                                    <td align="left" width="560" class="esd-container-frame">
                                      <table cellpadding="0" cellspacing="0" width="100%">
                                        <tbody>
                                          <tr>
                                            <td align="center" class="esd-block-social es-p15t es-p15b" style="font-size: 0">
                                              <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social">
                                                <tbody>
                                                  <tr>
                                                    <td align="center" valign="top" class="es-p40r">
                                                      <a href="" target="_blank">
                                                        <img src="https://gdcuat.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png" alt="Fb" title="Facebook" width="32">
                                                      </a>
                                                    </td>
                                                    <td valign="top" align="center" class="es-p40r">
                                                      <a href="" target="_blank">
                                                        <img src="https://gdcuat.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png" alt="Inst" title="Instagram" width="32">
                                                      </a>
                                                    </td>
                                                    <td align="center" valign="top">
                                                      <a href="" target="_blank">
                                                        <img src="https://gdcuat.stripocdn.email/content/assets/img/social-icons/logo-black/youtube-logo-black.png" alt="Yt" title="Youtube" width="32">
                                                      </a>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="center" class="esd-block-text es-p35b">
                                              <p>
                                                Glimmer&nbsp;© 2025&nbsp;Glimmer, LLC. All Rights Reserved.<br>
                                              </p>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>

              <!-- Final del correo -->
              <table align="center" cellpadding="0" cellspacing="0" class="es-content esd-footer-popover">
                <tbody>
                  <tr>
                    <td align="center" class="esd-stripe">
                      <table bgcolor="rgba(0, 0, 0, 0)" cellpadding="0" cellspacing="0" width="600" align="center" class="es-content-body" style="background-color: transparent">
                        <tbody>
                          <tr>
                            <td align="left" class="esd-structure es-p20">
                              <table cellpadding="0" cellspacing="0" width="100%">
                                <tbody>
                                  <tr>
                                    <td valign="top" width="560" align="center" class="esd-container-frame">
                                      <table cellspacing="0" width="100%" cellpadding="0">
                                        <tbody>
                                          <tr>
                                            <td align="center" class="esd-block-text es-infoblock">
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>`;
};

export default buildMail;
