const _ = require('lodash');
const criteria = require('./criteria');

const Controller = {};

function getMinMax(value) {
	const hargaMin = _.minBy(value, 'harga');
	const ramMax = _.maxBy(value, 'ram');
	const memoryMax = _.maxBy(value, 'memory');
	const processorMax = _.maxBy(value, 'processor');
	const cameraMax = _.maxBy(value, 'camera');
	return {
		harga: hargaMin.harga,
		ram: ramMax.ram,
		memory: memoryMax.memory,
		processor: processorMax.processor,
		camera: cameraMax.camera
	}
}

function normalisasi(matrix, maxmin) {
	matrix.harga = maxmin.harga / matrix.harga;
	matrix.ram = matrix.ram / maxmin.ram;
	matrix.memory = matrix.memory / maxmin.memory;
	matrix.processor = matrix.processor / maxmin.processor;
	matrix.camera = matrix.camera /maxmin.camera;

	return matrix;
}

function hitungPeringkat(nilai) {
	const total = (nilai.harga * criteria.harga) + (nilai.ram * criteria.ram) + (nilai.memory * criteria.memory) + (nilai.processor * criteria.processor) + (nilai.camera * criteria.camera); 
	const result = {
		nama: nilai.nama,
		total: total
	}
	return result;
}

Controller.getRecomendation = (req, res) => {
	const post = req.body;
	const getNilaiBobot = post;
	const getMaxMin = getMinMax(getNilaiBobot);
	const normalisasiNilai = _.map(getNilaiBobot, nilai => normalisasi(nilai, getMaxMin));
	const hitungBobotPeringkat = _.map(normalisasiNilai, nilai => hitungPeringkat(nilai));
	res.json(hitungBobotPeringkat)
};

module.exports = Controller;