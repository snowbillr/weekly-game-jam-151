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

  completeEvent(eventId: EventId, placements: EventPlacements) {
    const eventRecord = this.events[eventId] as CompletedEventRecord;
    eventRecord.completed = true;
    eventRecord.placements = placements;
  }

  getEventPlacements(eventId: EventId) {
    if (this.events[eventId].completed) {
      return (this.events[eventId] as CompletedEventRecord).placements;
    } else {
      return null;
    }
  }

  toJson(): object {
    return this.events;
  }

  fromJson(data: Record<string, any>) {
    const saveData = data as Record<EventId, EventRecord | CompletedEventRecord>;
    this.events = saveData;
  }
}
