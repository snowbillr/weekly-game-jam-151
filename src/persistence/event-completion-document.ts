import { PersistenceDocument } from '../plugins/global/persistence-plugin';
import { CharacterID } from '../constants/characters';

export enum EventId {
  HURDLES = 'hurdles',
  SPRINT = 'sprint',
  BALANCE_BEAM = 'balance_beam',
  ARCHERY = 'archery'
};

type EventRecord = {
  eventId: EventId;
  completed: false;
}

type EventPlacements = {
  first: CharacterID,
  second: CharacterID,
  third: CharacterID,
}

type CompletedEventRecord = {
  eventId: EventId;
  completed: true;
  placements: EventPlacements
}

export class EventCompletionDocument implements PersistenceDocument {
  public readonly name: string = 'event-completion';

  public events: Record<EventId, EventRecord | CompletedEventRecord>;

  constructor() {
    this.clear();
  }

  completeEvent(eventId: EventId, placements: EventPlacements) {
    const eventRecord = this.events[eventId] as CompletedEventRecord;
    eventRecord.completed = true;
    eventRecord.placements = placements;
  }

  getCharacterPlacements() {
    const characterPlacements = [
      {
        id: CharacterID.VIRTUAL_GUY,
        first: 0,
        second: 0,
        third: 0
      },
      {
        id: CharacterID.MASK_DUDE,
        first: 0,
        second: 0,
        third: 0
      },
      {
        id: CharacterID.PINK_MAN,
        first: 0,
        second: 0,
        third: 0
      },
      {
        id: CharacterID.NINJA_FROG,
        first: 0,
        second: 0,
        third: 0
      },
    ];

    Object.values(this.events).forEach((event) => {
      if (event.completed) {
        const placements = (event as CompletedEventRecord).placements;
        characterPlacements.find(cp => cp.id === placements.first)!.first += 1;
        characterPlacements.find(cp => cp.id === placements.second)!.second += 1;
        characterPlacements.find(cp => cp.id === placements.third)!.third += 1;
      }
    });

    return characterPlacements;
  }

  areAllComplete() {
    return Object.values(this.events).every(e => e.completed);
  }

  toJson(): object {
    return this.events;
  }

  fromJson(data: Record<string, any>) {
    const saveData = data as Record<EventId, EventRecord | CompletedEventRecord>;
    this.events = saveData;
  }

  clear() {
    this.events = {
      [EventId.ARCHERY]: {
        eventId: EventId.ARCHERY,
        completed: false
      },
      [EventId.BALANCE_BEAM]: {
        eventId: EventId.BALANCE_BEAM,
        completed: false
      },
      [EventId.HURDLES]: {
        eventId: EventId.HURDLES,
        completed: false
      },
      [EventId.SPRINT]: {
        eventId: EventId.SPRINT,
        completed: false
      },
    };
  }
}
