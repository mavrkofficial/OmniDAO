const fs = require('fs');
const path = require('path');

// Test what's actually exported from Ink Kit
try {
  const inkKit = require('@inkonchain/ink-kit');
  console.log('Available exports from @inkonchain/ink-kit:');
  console.log(Object.keys(inkKit));
} catch (error) {
  console.log('Error loading Ink Kit:', error.message);
  console.log('This suggests Ink Kit might not be properly installed or the components might not exist');
} 