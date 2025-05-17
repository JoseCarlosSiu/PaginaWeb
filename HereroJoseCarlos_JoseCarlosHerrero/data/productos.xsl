<?xml version="1.0" encoding="UTF-8"?>
<!--
  XSLT para transformar un catálogo de productos en HTML.
  Resalta productos en promoción y muestra información de stock y envío.
-->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <!-- Variable que contiene la lista de SKUs en promoción -->
  <xsl:variable name="promos" select="productos/promociones/@productoRefs"/>

  <!-- Plantilla principal que genera la estructura HTML -->
  <xsl:template match="/">
    <html>
      <head>
        <title>Catálogo de Productos</title>
        <!-- Estilos para la tabla y clases especiales -->
        <style>
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #333; color: white; }
          tr:nth-child(even) { background-color: #f2f2f2; }
          .promo { background-color: #fff7c0; font-weight: bold; }
        </style>
      </head>
      <body>
        <h1>Catálogo de Productos</h1>

        <!-- Itera sobre cada categoría de productos -->
        <xsl:for-each select="productos/categoria">
          <h2><xsl:value-of select="@nombre"/></h2>
          <table>
            <tr>
              <th>Nombre</th>
              <th>Marca</th>
              <th>Precio (€)</th>
              <th>Descripción</th>
              <th>Stock</th>
            </tr>

            <!-- Itera sobre cada producto de la categoría -->
            <xsl:for-each select="producto">
              <!-- Ordena los productos por precio ascendente -->
              <xsl:sort select="precio" data-type="number" order="ascending"/>
              <tr>
                <!-- Aplica la clase .promo si el SKU está en la lista de promociones -->
                <xsl:attribute name="class">
                  <xsl:if test="contains(concat(' ', $promos, ' '), concat(' ', @sku, ' '))">
                    promo
                  </xsl:if>
                </xsl:attribute>

                <!-- Nombre del producto -->
                <td><xsl:value-of select="nombre"/></td>
                <!-- Marca del producto -->
                <td><xsl:value-of select="marca"/></td>
                <!-- Precio y símbolo de promoción si aplica -->
                <td>
                  <xsl:value-of select="precio"/>
                  <xsl:if test="contains(concat(' ', $promos, ' '), concat(' ', @sku, ' '))">
                    <span style="color:red;"> 🔥</span>
                  </xsl:if>
                </td>
                <!-- Descripción del producto -->
                <td><xsl:value-of select="descripcion"/></td>
                <!-- Estado del stock con colores -->
                <td>
                  <xsl:choose>
                    <xsl:when test="@stock &gt; 10">
                      <span style="color:green">Disponible (<xsl:value-of select="@stock"/>)</span>
                    </xsl:when>
                    <xsl:when test="@stock &lt;= 10 and @stock &gt; 0">
                      <span style="color:orange">Últimas unidades (<xsl:value-of select="@stock"/>)</span>
                    </xsl:when>
                    <xsl:otherwise>
                      <span style="color:red">Agotado</span>
                    </xsl:otherwise>
                  </xsl:choose>
                </td>
              </tr>
            </xsl:for-each>
          </table>
        </xsl:for-each>

        <!-- Información de envío -->
        <h2>Información de Envío</h2>
        <p>Tipo: <xsl:value-of select="productos/envio/@tipo"/></p>
        <p>Costo: <xsl:value-of select="productos/envio/@costo"/> €</p>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
