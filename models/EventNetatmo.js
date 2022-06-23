class EventNetatmo {

  /**
   * @constructor
   * @param homeId
   * @param deviceId
   * @param eventType
   * @param subType
   */
  constructor(homeId, deviceId, eventType, subType) {
    this.homeId = homeId;
    this.deviceId = deviceId;
    this.eventType = eventType;
    this.subType = subType;
  }

  /**
   * Get event description
   */
  getEventDescription() {

    if (this.eventType === 'battery_status') {
      if (this.subType === 0) {
        return "Low"
      }
      else if (this.subType === 1) {
        return "Very Low"
      }
      else {
        return "Unknown subtype"
      }
    }

    if (this.eventType === 'detection_chamber_status') {
      if (this.subType === 0) {
        return "Clean"
      }
      else if (this.subType === 1) {
        return "Dusty"
      }
      else {
        return "Unknown subtype"
      }
    }

    if (this.eventType === 'hush') {
      if (this.subType === 0) {
        return "Activate"
      }
      else {
        return "Unknown subtype"
      }
    }

    if (this.eventType === 'smoke') {
      if (this.subType === 0) {
        return "Cleared"
      }
      else if (this.subType === 1) {
        return "Detected"
      }
      else {
        return "Unknown subtype"
      }
    }

    if (this.eventType === 'sound_test') {
      if (this.subType === 0) {
        return "Ok"
      }
      else if (this.subType === 1) {
        return "Error"
      }
      else {
        return "Unknown subtype"
      }
    }

    if (this.eventType === 'tampered') {
      if (this.subType === 0) {
        return "Ready"
      }
      else if (this.subType === 1) {
        return "Tampered"
      }
      else {
        return "Unknown subtype"
      }
    }

    if (this.eventType === 'wifi_status') {
      if (this.subType === 0) {
        return "Error"
      }
      else if (this.subType === 1) {
        return "Ok"
      }
      else {
        return "Unknown subtype"
      }
    }

    return "Unknown event"
  }
}
module.exports = EventNetatmo;