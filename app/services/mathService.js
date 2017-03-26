

export default {
	bytesToSizeStr: (bytes) => {
		var sizes = ['b', 'kb', 'mb', 'gb', 'tb']
		if (!bytes) return '0b'
		var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
		return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i]
	},

	bytesToSize: (bytes) => {
		var sizes = ['b', 'kb', 'mb', 'gb', 'tb']
		if (!bytes) return 0
		var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
		return parseFloat((bytes / Math.pow(1024, i)).toFixed(1))
	}
}