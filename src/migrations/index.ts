import * as migration_20250726_113914_initial from './20250726_113914_initial';
import * as migration_20250805_185548 from './20250805_185548';

export const migrations = [
  {
    up: migration_20250726_113914_initial.up,
    down: migration_20250726_113914_initial.down,
    name: '20250726_113914_initial',
  },
  {
    up: migration_20250805_185548.up,
    down: migration_20250805_185548.down,
    name: '20250805_185548'
  },
];
