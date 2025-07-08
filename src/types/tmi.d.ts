declare module 'tmi.js' {
  export interface ClientOptions {
    connection?: {
      secure?: boolean;
      reconnect?: boolean;
      maxReconnectAttempts?: number;
      maxReconnectInterval?: number;
      reconnectDecay?: number;
      reconnectInterval?: number;
      timeout?: number;
    };
    identity?: {
      username?: string;
      password?: string;
    };
    channels?: string[];
    options?: {
      clientId?: string;
      debug?: boolean;
      messagesLogLevel?: string;
      skipMembership?: boolean;
      skipUpdatingEmotesets?: boolean;
    };
  }

  export interface ChatUserstate {
    'badge-info'?: string | null;
    badges?: { [badgeName: string]: string } | null;
    color?: string | null;
    'display-name'?: string;
    emotes?: { [emoteid: string]: string[] } | null;
    flags?: string | null;
    id?: string;
    mod?: boolean;
    'room-id'?: string;
    subscriber?: boolean;
    'tmi-sent-ts'?: string;
    turbo?: boolean;
    'user-id'?: string;
    'user-type'?: string | null;
    'emotes-raw'?: string | null;
    'badge-info-raw'?: string | null;
    'badges-raw'?: string | null;
    username?: string;
    'message-type'?: string;
    [key: string]: any;
  }

  export class Client {
    constructor(options?: ClientOptions);
    
    connect(): Promise<[string, number]>;
    disconnect(): Promise<[string, number]>;
    
    on(event: 'message', listener: (
      channel: string,
      userstate: ChatUserstate,
      message: string,
      self: boolean
    ) => void): this;
    
    on(event: 'connected', listener: (address: string, port: number) => void): this;
    on(event: 'disconnected', listener: (reason: string) => void): this;
    on(event: 'reconnect', listener: () => void): this;
    on(event: 'connecting', listener: (address: string, port: number) => void): this;
    on(event: 'logon', listener: () => void): this;
    
    on(event: string, listener: (...args: any[]) => void): this;
    
    say(channel: string, message: string): Promise<[string]>;
    whisper(username: string, message: string): Promise<[string]>;
    
    getChannels(): string[];
    getOptions(): ClientOptions;
    getUsername(): string;
    isMod(channel: string, username: string): boolean;
    readyState(): string;
  }

  export default Client;
}
