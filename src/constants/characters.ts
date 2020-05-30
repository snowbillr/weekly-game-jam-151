export enum CharacterID {
  VIRTUAL_GUY = 'VIRTUAL_GUY'
}

type CharacterDescriptor = {
  name: string,
  texture: string
}

export const Characters: Record<CharacterID, CharacterDescriptor> = {
  [CharacterID.VIRTUAL_GUY]: {
    name: 'Virtual Guy',
    texture: 'virtual-guy'
  }
}
