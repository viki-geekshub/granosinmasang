const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');



(async () => {
	
	await imagemin(['src/assets/images/productsImages/*.{jpg,png}'], {
		destination: 'src/assets/images/productsImages/',
		plugins: [
			imageminWebp({
				lossless: true, // Losslessly encode images
				quality: 75,
				resize: {
					width: 1500,
					height: 0
				}
			})
		]
	});
	console.log('Images optimized');
})();