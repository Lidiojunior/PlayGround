export function circleHits(x, z, r, colliders) {
  for (let i = 0; i < colliders.length; i++) {
    const b = colliders[i];
    if (x + r > b.min.x && x - r < b.max.x && z + r > b.min.z && z - r < b.max.z) return b;
  }
  return null;
}

export function moveCircle(pos, dx, dz, radius, colliders, bounds) {
  if (dx !== 0) {
    const nx = pos.x + dx;
    if (!circleHits(nx, pos.z, radius, colliders)) pos.x = nx;
  }
  if (dz !== 0) {
    const nz = pos.z + dz;
    if (!circleHits(pos.x, nz, radius, colliders)) pos.z = nz;
  }
  if (bounds) {
    pos.x = Math.max(bounds.minX + radius, Math.min(bounds.maxX - radius, pos.x));
    pos.z = Math.max(bounds.minZ + radius, Math.min(bounds.maxZ - radius, pos.z));
  }
}
