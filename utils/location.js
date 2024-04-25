// Function to calculate distance between two points (Haversine formula)
function distance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

// Function to convert degrees to radians
function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

// Function to check if a position is included within the route
exports.isPositionIncludedInRoute = (route, position, thresholdDistance) => {
  for (let i = 0; i < route.length - 1; i++) {
    const segmentStart = route[i];
    const segmentEnd = route[i + 1];
    const distStart = distance(
      position.latitude,
      position.longitude,
      segmentStart.latitude,
      segmentStart.longitude
    );
    const distEnd = distance(
      position.latitude,
      position.longitude,
      segmentEnd.latitude,
      segmentEnd.longitude
    );
    const segmentLength = distance(
      segmentStart.latitude,
      segmentStart.longitude,
      segmentEnd.latitude,
      segmentEnd.longitude
    );

    // Calculate the distance along the segment from start to the position
    const projDistance = Math.sqrt(
      distStart * distStart -
        ((distStart * distStart - distEnd * distEnd) / segmentLength) ** 2
    );

    // Check if the projected distance is within the threshold
    if (projDistance <= thresholdDistance) {
      return true;
    }
  }
  return false;
};
