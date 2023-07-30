// Unused

export const stateStore = {
	isTrackpad: true,
	isDefined: false
}

// type OS = 'window' | 'laptop' | 'mac' | 'macbook' | 'ubuntu' | 'mobile'
// let os: OS | '' = ''

// Frequency
let eventCount = 0
let eventCountStart: number

// Touchstart Event
let hasTouchstart = false
window.addEventListener('touchstart', () => (hasTouchstart = true), { once: true, capture: true })

// WheelDeltaY
let isFixedWheelDelta = false
let wheelDeltaY: number | null = null

function detectTrackPad(event: Event & { wheelDeltaY?: number; deltaMode?: 0; deltaY?: number }) {
	if (!stateStore.isDefined) {
		// Detect wheelDeltaY
		if (typeof wheelDeltaY === 'number') {
			if (wheelDeltaY === event.wheelDeltaY) isFixedWheelDelta = true
			else isFixedWheelDelta = false
		}
		wheelDeltaY = Math.abs(event.wheelDeltaY!)

		// Detect frequency
		if (eventCount === 0) {
			eventCountStart = performance.now()
		}

		eventCount++

		let diff: number
		if ((diff = performance.now() - eventCountStart) > 66) {
			if (eventCount >= 4) {
				stateStore.isTrackpad = true
				done()
			} else if (isFixedWheelDelta) {
				stateStore.isTrackpad = false
				done()
			} else {
				console.warn('[detect exception]', diff, eventCount, hasTouchstart, isFixedWheelDelta)
				reset()
			}
		}
	}
}
function done() {
	stateStore.isDefined = true
	document.removeEventListener('mousewheel', detectTrackPad, true)
	document.removeEventListener('DOMMouseScroll', detectTrackPad, true)
}
function reset() {
	eventCount = 0
	stateStore.isDefined = false
}

void (function start() {
	document.addEventListener('mousewheel', detectTrackPad, true)
	document.addEventListener('DOMMouseScroll', detectTrackPad, true)
})()
