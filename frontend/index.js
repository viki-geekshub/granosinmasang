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
	console.log('Categories Images optimized');
})();

(async () => {
	
	await imagemin(['src/assets/images/background/*.{jpg,png}'], {
		destination: 'src/assets/images/background/',
		plugins: [
			imageminWebp({
				lossless: true, // Losslessly encode images
				quality: 75,
				resize: {
					width: 2500,
					height: 0
				}
			})
		]
	});
	console.log('Background Images optimized');
})();

(async () => {
	
	await imagemin(['src/assets/images/banners/*.{jpg,jpeg,png}'], {
		destination: 'src/assets/images/banners/',
		plugins: [
			imageminWebp({
				lossless: true, // Losslessly encode images
				quality: 75,
				resize: {
					width: 0,
					height: 300
				}
			})
		]
	});
	console.log('Banner Images optimized');
})();

