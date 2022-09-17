/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  AccountInfo,
} from "@azure/msal-node"
import {
  packet_command_output,
  packet_start_game,
  ClientBoundPackets,
  ServerBoundPackets,
} from "./packets.i"
import { Skin } from "./packetTypes.i"

export interface PluginApi {
  new (berp: any, config: examplePluginConfig, path: string, connection: ConnectionHandler)
  path: string
  onEnabled(): Promise<void>
  onDisabled(): Promise<void>
  getLogger(): Logger
  getConnection(): ConnectionHandler
  getConfig(): examplePluginConfig
  getApiId(): number
  getPluginId(): number
  getInstanceId(): number
  getCommandManager(): CommandManager
  getEventManager(): EventManager
  getPlayerManager(): PlayerManager
  getEntityManager(): EntityManager
  getWorldManager(): WorldManager
  getRealmManager(): RealmManager
  getSocketManager(): SocketManager
  getPlugins(): Map<string, ActivePlugin>
  getPluginByInstanceId(name: string, id: number): Promise<ActivePlugin>
  createInterface(options: InterfaceOptions): void
  autoConnect(accountEmail: string, realmId: number): Promise<void>
  autoReconnect(accountEmail: string, realmId: number): Promise<void>
}

interface InterfaceOptions {
  name: string
  interface: string
}

export interface examplePlugin {
  new (pluginApi: any)
  onEnabled(): Promise<void>
  onDisabled(): Promise<void>
}

interface examplePluginConfig {
  name: string
  displayName: string
  color: string
  version: string
  description: string
  devMode: boolean
  main: string
  scripts: {
    build: string
    dev: string
    start: string
    [key: string]: string
  }
  author: string
  license: string
  dependencies: {
    [key: string]: string
  }
  devDependencies: {
    [key: string]: string
  }
  [key: string]: unknown
}

export interface ConnectionHandler extends RakManager {
  readonly KEEPALIVEINT: number
  readonly host: string
  readonly port: number
  readonly realm: RealmAPIWorld
  getGameInfo(): packet_start_game
  getLogger(): Logger
  getTick(): bigint
  getConnectionManager(): ConnectionManager
  close(): void
  sendCommandFeedback(option: boolean): void
  getPlugins(): Map<string, ActivePlugin>
}

export interface RakManager {
  readonly host: string
  readonly port: number
  readonly id: number
  readonly version: string
  readonly X509: string
  readonly SALT: string
  readonly CURVE: string
  readonly ALGORITHM: string
  readonly PUBLIC_KEY_ONLINE: string
  on<K extends keyof ClientBoundPackets>(event: K, listener: (...args: ClientBoundPackets[K]) => void): this
  on<S extends string | symbol>(
    event: Exclude<S, keyof ClientBoundPackets>,
    listener: (...args: any[]) => void, 
  ): this
  once<K extends keyof ClientBoundPackets>(event: K, listener: (...args: ClientBoundPackets[K]) => void): this
  once<S extends string | symbol>(
    event: Exclude<S, keyof ClientBoundPackets>,
    listener: (...args: any[]) => void, 
  ): this
  emit<K extends keyof ClientBoundPackets>(event: K, ...args: ClientBoundPackets[K]): boolean
  emit<S extends string | symbol>(
    event: Exclude<S, keyof ClientBoundPackets>,
    ...args: any[]
  ): boolean
  getRakLogger(): Logger
  getXboxProfile(): XboxProfile
  sendPacket<K extends keyof ServerBoundPackets>(name: K, params: ServerBoundPackets[K][0]): Promise<{ name: K, params: ServerBoundPackets[K][0] }>
}

interface XboxProfileExtraData {
  XUID: string
  identity: string
  displayName: string
  titleId: number
}
interface XboxProfile {
  nbf: number
  extraData: XboxProfileExtraData
  randomNonce: number
  iss: string
  exp: number
  iat: number
  identityPublicKey: string
}

interface RealmAPIWorld {
  id: number
  remoteSubscriptionId: string
  owner: string
  ownerUUID: string
  name: string
  motd: string
  defaultPermission: string
  state: string
  daysLeft: number
  expired: boolean
  expiredTrial: boolean
  gracePeriod: boolean
  worldType: string
  players: unknown
  maxPlayers: number
  minigameName: string
  minigameId: unknown
  minigameImage: unknown
  activeSlot: number
  slots: unknown
  member: boolean
  clubId: number
  subscriptionRefreshStatus: unknown
}

export interface ConnectionManager {
  getAccount(): AccountInfo
  getLogger(): Logger
  getConnections(): Map<number, ConnectionHandler>
  kill(): void
  killAll(): void
  closeSingle(id: number): void
  newConnection(host: string, port: number, realm: RealmAPIWorld): Promise<ConnectionHandler>
}

export interface Logger {
  changeColor(newColor: LoggerColors): void
  useHex(newColor: string): void
  info(...content: unknown[]): void
  success(...content: unknown[]): void
  warn(...content: unknown[]): void
  error(...content: unknown[]): void
  debug(...content: unknown[]): void
}

type LoggerColors = (
  "black" |
  "blackBright" |
  "red" |
  "redBright" |
  "green" |
  "greenBright" |
  "yellow" |
  "yellowBright" |
  "blue" |
  "blueBright" |
  "magenta" |
  "magentaBright" |
  "cyan" |
  "cyanBright" |
  "white" |
  "whiteBright" |
  "gray" |
  "grey" 
)

export interface CommandManager {
  enabled: boolean
  executeCommand(command: string, callback?: (res: packet_command_output) => void): void
  registerConsoleCommand(options: ConsoleCommandOptions, callback: (args: string[]) => void): void
  registerCommand(options: CommandOptions, callback: (data: CommandResponse) => void): void
  getPrefix(): string
  setPrefix(prefix: string): void
}

export interface EventManager {
  on<K extends keyof EventValues>(event: K, callback: (...args: EventValues[K]) => void): this
  on<S extends string | symbol>(
    event: Exclude<S, keyof EventValues>,
    callback: (...args: unknown[]) => void,
  ): this
  once<K extends keyof EventValues>(event: K, callback: (...args: EventValues[K]) => void): this
  once<S extends string | symbol>(
    event: Exclude<S, keyof EventValues>,
    callback: (...args: unknown[]) => void,
  ): this
  emit<K extends keyof EventValues>(event: K, ...args: EventValues[K]): boolean
  emit<S extends string | symbol>(
    event: Exclude<S, keyof EventValues>,
    ...args: unknown[]
  ): boolean
}

interface EventValues {
  PlayerJoin: [Player]
  PlayerLeft: [Player]
  PlayerInitialized: [Player]
  PlayerMessage: [PlayerMessage] 
  PlayerDied: [PlayerDied]
  ChatCommand: [ChatCommand]
  EntityCreate: [Entity]
  EntityDestroyed: [Entity]
  ChangeSkin: [ChangeSkin]
}

export interface Player {
  getName(): string
  getNameTag(): string
  getRealmID(): number
  getUUID(): string 
  getXuid(): string
  getEntityID(): bigint 
  getDevice(): string
  getSkinData(): Skin
  getExecutionName(): string
  getConnection(): ConnectionHandler
  setNameTag(nameTag: string): void
  sendMessage(message: string): void
  sendTitle(message: string, slot: 'actionbar' | 'title' | 'subtitle'): void
  executeCommand(command: string, callback?: (data: packet_command_output) => void): void
  getTags(): Promise<string[]>
  hasTag(tag: string): Promise<boolean>
  addTag(tag: string): void
  removeTag(tag: string): void
  getScore(objective: string): Promise<number>
  updateScore(operation: 'add' | 'remove' | 'set', objective: string, value: number): void
  kick(reason: string): void
  getItemCount(item: string): Promise<number>
  getLocation(): Promise<BlockPos>
  getInventory(): Promise<Inventory[]>
}

interface PlayerMessage {
  sender: Player
  message: string
}

interface PlayerDied {
  player: Player
  killer?: Player | string
  cause: string
}

interface ChangeSkin {
  raw: Skin
  base64: string
  player: Player
}

interface ChatCommand {
  sender: Player
  command: string
}

interface JsonRequest {
  berp: JsonData
}

export interface JsonData {
  event?: string
  sender?: any
  player?: any
  entities?: any
  entity?: any
  command?: any
  message?: string
  data?: any
  requestId: string
}

export interface PlayerManager {
  addPlayer(player: Player): void
  removePlayer(player: Player): void
  getPlayerByName(name: string): Player
  getPlayerByUUID(uuid: string): Player
  getPlayerByXuid(xuid: string): Player
  getPlayerByEntityID(entityID: bigint): Player
  getPlayerList(): Map<string, Player>
  updatePlayerNameTag(player: Player, nameTag: string): void
}

export interface EntityManager {
  addEntity(entity: Entity): void
  removeEntity(entity: Entity): void
  getEntityByRuntimeID(runtimID: number): Entity
  getEntities(): Map<number, Entity>
}

export interface Entity {
  getID(): string
  getNameTag(): string
  getRuntimeID(): number
  executeCommand(command: string): void
  setNameTag(nameTag: string): void
  getLocation(): Promise<BlockPos>
}

export interface WorldManager {
  sendMessage(message: string): void
  kickAll(reason: string): void
}

export interface RealmManager {
  downloadRealm(): Promise<string>
  renameRealm(name: string): Promise<void>
  closeRealm(): Promise<boolean>
  openRealm(): Promise<boolean>
  banUser(XUID: string): Promise<boolean>
  restartRealm(): Promise<boolean>
  updatePlayerPermission(player: Player, permissionLevel: "VISITOR" | "MEMBER" | "OPERATOR"): Promise<boolean>
  getId(): number
  getName(): string
  getDayTillExpired(): number
}

export interface SocketManager {
  on<K extends keyof SocketValues>(event: K, callback: (...args: SocketValues[K]) => void): this
  on<S extends string | symbol>(
    event: Exclude<S, keyof SocketValues>,
    callback: (...args: unknown[]) => void,
  ): this
  once<K extends keyof SocketValues>(event: K, callback: (...args: SocketValues[K]) => void): this
  once<S extends string | symbol>(
    event: Exclude<S, keyof SocketValues>,
    callback: (...args: unknown[]) => void,
  ): this
  emit<K extends keyof SocketValues>(event: K, ...args: SocketValues[K]): boolean
  emit<S extends string | symbol>(
    event: Exclude<S, keyof SocketValues>,
    ...args: unknown[]
  ): boolean
  sendMessage(options: JsonRequest, callback?: (data: JsonData) => void): void
  // @ts-ignore
  sendPacket<K extends keyof SocketOutboundValues>(name: K, params: SocketOutboundValues[K][0], callback?: (data: SocketValues[K][0]) => void): void
  getHeartbeats(): number
  newUUID(): string
}

export interface SocketValues {
  Message: [JsonData]
  SocketEnabled: [defaultRequest]
  SocketDisabled: [defaultRequest]
  Heartbeat: [Heartbeat]
  EntityDestroyed: [SocketEntity]
  EntityCreate: [SocketEntity]
  PlayerMessage: [PlayerMessageSocket]
  ChatCommand: [ChatCommandSocket]
  InventoryRequest: [InventoryRequest]
  CommandRequest: [CommandRequest]
  PlayerRequest: [PlayerRequest]
  EntityRequest: [SocketEntity]
  UpdateEntity: [UpdateEntity]
  NameTagChanged: [NameTagChanged]
  TagsRequest: [TagsRequest]
  GetRequests: [GetRequests]
  GetPlayers: [GetPlayers]
  GetEntities: [GetEntities]
  ScoreRequest: [ScoreRequest]
}

interface defaultRequest {
  event: string
  message?: string
  requestId: string
}

export interface Heartbeat extends defaultRequest {
  tick: number
}

export interface SocketEntity extends defaultRequest {
  entity: {
    id: string
    runtimeId: number
    nameTag: string
    health: {
      current: number
      max: number
    }
    location: BlockPos
  }
}

export interface PlayerMessageSocket extends defaultRequest {
  sender: string
  player: {
    name: string
    nameTag: string
  }
  message: string
}

export interface ChatCommandSocket extends defaultRequest {
  sender: string
  player: {
    name: string
    nameTag: string
  }
  command: string
}

export interface InventoryRequest extends defaultRequest {
  data: {
    slot: number
    id: string
    amount: number
    data: number
  }[]
}

export interface Inventory {
  slot: number
  id: string
  amount: number
  data: number
}

export interface CommandRequest extends defaultRequest {
  data: {
    statusMessage?: string
  }
}

export interface PlayerRequest extends defaultRequest {
  player: {
    name: string
    nameTag: string
    health: {
      current: number
      max: number
    }
    location: BlockPos
    isSneaking: boolean
    id: string
  }
}

export interface UpdateEntity extends defaultRequest {
  data: {
    statusMessage: string
    err: boolean
  }
}

export interface NameTagChanged extends defaultRequest {
  player: string
  data: {
    old: string
    new: string
  }
}

export interface TagsRequest extends defaultRequest {
  player: string
  data: string[]
}

export interface GetRequests extends defaultRequest {
 data: {
   request: string
   params: string
 }[]
}

export interface GetPlayers extends defaultRequest {
  data: {
    name: string
    nameTag: string
  }[]
}

export interface GetEntities extends defaultRequest {
  data: {
    id: string
    runtimeId: number
    nameTag: string
  }[]
}

export interface ScoreRequest extends defaultRequest {
  data: number
}

interface CommandOptions {
  command: string
  aliases?: string[]
  description: string
  permissionTags?: string[]
}

export interface ConsoleCommandOptions {
  command: string
  aliases: string[]
  description: string
  usage: string
}

interface CommandResponse {
  sender: Player
  args: string[]
}

interface ActivePlugin {
  config: examplePluginConfig
  plugin: examplePlugin
  api: PluginApi
  connection: ConnectionHandler
  path: string
  ids: {
    api: number
    plugin: number
    instance: number
  }
}

interface BlockPos {
  x: number
  y: number
  z: number
}

export interface SocketOutboundValues {
  CommandRequest: [CommandRequestOutbound]
  DisableRequest: []
  EnableRequest: []
  EntityRequest: [EntityRequestOutbound]
  ToggleMessages: [ToggleRequests]
  ToggleCommands: [ToggleRequests]
  GetRequests: []
  InventoryRequest: [InventoryRequestOutbound]
  PlayerRequest: [PlayerRequestOutbound]
  TagsRequest: [PlayerRequestOutbound]
  UpdateEntity: [UpdateEntityOutbound]
  UpdateNameTag: [UpdateNameTagOutbound]
  GetPlayers: []
  GetEntities: []
  ScoreRequest: [ScoreRequestOutbound]
}

interface CommandRequestOutbound {
  command: string
}

interface EntityRequestOutbound {
  entity: number
}

interface ToggleRequests {
  data: boolean
}

interface InventoryRequestOutbound {
  player: string
}

interface PlayerRequestOutbound {
  player: string
}

interface UpdateEntityOutbound {
  entity: number
  data: {
    nameTag?: string
    kill?: boolean
    command?: string
    triggerEvent?: string
  }
}

interface UpdateNameTagOutbound {
  player: string
  message: string
}

interface ScoreRequestOutbound {
  player: string
  data: {
    objective: string
  }
}
