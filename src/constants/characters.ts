export enum CharacterID {
  VIRTUAL_GUY = 'VIRTUAL_GUY',
  MASK_DUDE = 'MASK_DUDE',
  NINJA_FROG = 'NINJA_FROG',
  PINK_MAN = 'PINK_MAN'
}

export type CharacterDescriptor = {
  id: CharacterID;
  name: string;
  texture: string;
}

export const Characters: Record<CharacterID, CharacterDescriptor> = {
  [CharacterID.VIRTUAL_GUY]: {
    id: CharacterID.VIRTUAL_GUY,
    name: 'Virtual Guy',
    texture: 'virtual-guy'
  },
  [CharacterID.MASK_DUDE]: {
    id: CharacterID.MASK_DUDE,
    name: 'Mask Dude',
    texture: 'mask-dude'
  },
  [CharacterID.NINJA_FROG]: {
    id: CharacterID.NINJA_FROG,
    name: 'Ninja Frog',
    texture: 'ninja-frog'
  },
  [CharacterID.PINK_MAN]: {
    id: CharacterID.PINK_MAN,
    name: 'Pink Man',
    texture: 'pink-man'
  }
}
