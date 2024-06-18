import { BLUEPRINT_FORMAT } from '../blueprintFormat'

export function addProjectToRecentProjects(file: FileResult) {
	if (!Project || !file.path) return
	const name = pathToName(file.path, true)
	if (file.path && isApp && !file.no_file) {
		const project = Project
		Project.save_path = file.path
		Project.name = pathToName(name, false)
		addRecentProject({
			name,
			path: file.path,
			icon: BLUEPRINT_FORMAT.icon,
		})
		setTimeout(() => {
			if (Project === project) void updateRecentProjectThumbnail()
		}, 200)
	}
}

/**
 * Rounds a number to a certain number of decimal places
 */
export function roundTo(n: number, d: number) {
	return Math.round(n * 10 ** d) / 10 ** d
}

/**
 * Rounds a number to the nearest multiple of n
 */
export function roundToNth(n: number, x: number) {
	return Math.round(n * x) / x
}

export function resolveEnvVariables(path: string) {
	return path.replace(/%([^%]+)%/g, function (_, key: string) {
		if (!process.env[key]) {
			throw new Error('Environment variable ' + key + ' does not exist.')
		}
		return process.env[key]!
	})
}

export function floatToHex(n: number) {
	return Number((255 * n).toFixed(0))
		.toString(16)
		.padStart(2, '0')
}

export function makeNotZero(vec: THREE.Vector3 | THREE.Euler) {
	if (vec.x === 0) vec.x = 0.00001
	if (vec.y === 0) vec.y = 0.00001
	if (vec.z === 0) vec.z = 0.00001
}
