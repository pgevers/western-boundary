const fs = require('fs');
const csv = require('csv-parser');
const { v4: uuidv4 } = require('uuid');

const filePath = './modalyst_export_generic-2025-04-02--21-46-51-816747.csv'; // Replace with your CSV file
const productMap = {};

let lastProductKey = null;

fs.createReadStream(filePath)
  .pipe(csv())
  .on('data', (row) => {
    const name = row['Name']?.trim();
    const code = row['Code']?.trim();
    const productId = code || name; // fallback if 'Product ID' is blank

    const isNewProduct = name || code;

    // If this row has product info, treat it as a new product
    if (isNewProduct && !productMap[productId]) {
      productMap[productId] = {
        _id: uuidv4(),
        _type: 'product',
        name,
        sku: code,
        brand: row['Brand']?.trim() || '',
        description: row['Description']?.trim() || '',
        price: parseFloat(row['Retail Price']) || 0,
        salePrice: parseFloat(row['Sale Price']) || 0,
        shippingPrice: parseFloat(row['Fixed Shipping Price']) || 0,
        warranty: row['Warranty']?.trim() || '',
        stockLevel: parseInt(row['Stock Level']) || 0,
        material: row['Material']?.trim() || '',
        productUrl: row['Product URL']?.trim() || '',
        metaDescription: row['META Description']?.trim() || '',
        condition: row['Product Condition']?.trim() || '',
        images: [],
      };

      lastProductKey = productId;
    }

    // Even if row is blank, it might contain additional images
    const image = row['Images']?.trim();
    if (image && lastProductKey) {
      const images = productMap[lastProductKey].images;
      if (!images.includes(image)) {
        images.push(image);
      }
    }
  })
  .on('end', () => {
    const docs = Object.values(productMap);
    const ndjson = docs.map((doc) => JSON.stringify(doc)).join('\n');
    fs.writeFileSync('./sanity-products.ndjson', ndjson);
    console.log(`✅ Done! Converted ${docs.length} products to sanity-products.ndjson`);
  });
