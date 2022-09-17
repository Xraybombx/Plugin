/* eslint-disable @typescript-eslint/no-empty-interface */
export * from './packetTypes.i'
import {
  bool,
  i32,
  LoginTokens,
  PlayStatusTypes,
  TexturePackInfos,
  BehaviorPackInfos,
  ResourcePackIdVersions,
  Experiments,
  ResourcePackClientResponseStatus,
  ResourcePackIds,
  TextType,
  zigzag32,
  zigzag64,
  varint64,
  GameMode,
  vec3f,
  vec2f,
  li16,
  BlockCoordinates,
  lf32,
  varint,
  GameRules,
  li32,
  StartGameMovementAuth,
  li64,
  BlockProperties,
  Itemstates,
  uuid,
  MetadataDictionary,
  Links,
  Item,
  EntityAttributes,
  u8,
  Rotation,
  MovePlayerMode,
  MovePlayerTeleport,
  UpdateBlockFlags,
  LevelEventEvent,
  BlockEventType,
  EntityEventEventId,
  PlayerAttributes,
  Transaction,
  WindowID,
  InteractActionId,
  lu64,
  Action,
  Link,
  SetSpawnPositionType,
  AnimateActionId,
  WindowType,
  WindowIDVarint,
  ItemStacks,
  Recipes,
  PotionTypeRecipes,
  PotionContainerChangeRecipes,
  CraftingEventRecipeType,
  AdventureFlags,
  AdventureCommandPermission,
  ActionPermissions,
  AdventurePermission,
  nbt,
  ByteArray,
  PlayerRecords,
  EventType,
  UpdateMapFlags,
  ClientBoundMapItemDataTracked,
  ClientBoundMapItemDataTexture,
  BossEventType,
  AvailableCommandsEnum,
  AvailableCommandsData,
  DynamicEnum,
  EnumConstraint,
  CommandOrigin,
  CommandBlockUpdateMode,
  CommandOutputType,
  CommandOutputOutput,
  lu32,
  ResourcePackDataType,
  lu16,
  SetTitleType,
  StructureBlockSettings,
  Skin,
  BookEditType,
  NPCRequestType,
  NPCRequestActionType,
  SetScoreAction,
  ScoreEntry,
  LabTableAction,
  vec3u,
  UpdateBlockSyncType,
  DeltaMoveFlags,
  ScoreboardIdentityAction,
  ScoreboardIdentityEntry,
  SoundType,
  nbtLoop,
  vec3i,
  StructureTemplateData,
  StructureTemplateType,
  MultiplayerSettingsType,
  CompletedUsingItemMethod,
  u16,
  InputFlag,
  PlayerAuthInputMode,
  PlayerAuthInputTransaction,
  ItemStackRequest,
  PlayerAuthInputBlockAction,
  CreativeContentItem,
  EnchantOption,
  ItemStackResponses,
  ArmorDamageType,
  PositionTrackingAction,
  PacketViolationSeverity,
  CameraShakeAction,
  ItemComponentList,
  DebugRendererType,
  SimulationTypeType,
  NPCDialogueType,
} from "./packetTypes.i"

/**
 * All Packets Combined
 * 
 * `Warn`: Some of the bindings may be incorrect/outdated
 */
export enum Packets {
  /**
   * `Bound To Server`
   * ___
   * Sent by the client when the client initially tries to join the server.
   * 
   * It is the first packet sent and contains a chain of tokens with data specific to the player.
   */
  Login = "login",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server after the login packet is sent.
   * It will contain a status stating either the login was successful or what went wrong.
   */
  PlayStatus = "play_status",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server asking for a handshake with a token containing the needed "salt" to start packet encryption.
   */
  ServerToClientHandshake = "server_to_client_handshake",
  /**
   * `Bound To Server`
   * ___
   * Sent by the client once the client has successfully started encryption.
   * 
   * This packet should be the first encrypted packet sent to the server and all following packets should be encrypted aswell.
   */
  ClientToServerHandshake = "client_to_server_handshake",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server when the client is disconnected containing information about the disconnection.
   */
  Disconnect = "disconnect",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server containing info of all resource packs applied. 
   * 
   * This packet can be used to download the packs on the server.
   * 
   * If you are just trying to join the server however just send a `ResourcePackClientResponse` with a status of `completed` and ignore the info on this packet completly.
   */
  ResourcePacksInfo = "resource_packs_info",
  /**
   * `Bound To Client`
   * ___
   * Similar to `ResourcePacksInfo`
   * 
   * Send `ResourcePackClientResponse` with a status of `completed` to continue past this packet.
   */
  ResourcePacksStack = "resource_pack_stack",
  /**
   * `Bound To Server`
   * ___
   * Sent by the client stating its response to the packets `ResourcePacksInfo` and or `ResourcePacksStack`
   */
  ResourcePackClientResponse = "resource_pack_client_response",
  /**
   * `Bound To Server & Client`
   * ___
   * Sent by the client to send chat messages.
   * 
   * Sent by the server to forward messages, popups, tips, json, etc. 
   */
  Text = "text",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server to update the current time client-side. The client actually advances time
   * client-side by itself, so this packet does not need to be sent each tick. It is merely a means
   * of synchronizing time between server and client.
   */
  SetTime = "set_time",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server to send information about the world the player will be spawned in.
   */
  StartGame = "start_game",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server to add a new client for an individual client. It is one of the few entities that cannot be added via the `AddEntity` packet.
   */
  AddPlayer = "add_player",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server to add a client-sided entity. It is used for every entity except other players, paintings and items,
   * for which the `AddPlayer`, `AddPainting`, and `AddItemEntity` packets are used.
   */
  AddEntity = "add_entity",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server to remove an entity that currently exists in the world from the client-side.
   * 
   * Sending this packet if the client cannot already see this entity will have no effect
   */
  RemoveEntity = "remove_entity",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server to add a dropped item client-side. It is one of the few entities that cannot be added via the `AddEntity` packet.
   */
  AddItemEntity = "add_item_entity",
  /**
   * `Bound To Client`
   * ___
   * Sent by the serer when a player picks up an item to remove it from the client-side.
   * 
   * It will remove the item entity then play the pickup animation.
   */
  TakeItemEntity = "take_item_entity",
  /**
   * `Bound To Server & Client`
   * ___
   * Sent by the server to move an entity to an absolute position.
   * 
   * This packet is typically used for movements where high accuracy is not needed, such as long range teleporting.
   * 
   * Sent by the client when riding a mountable.
   */
  MoveEntity = "move_entity",
  /**
   * `Bound To Server & Client`
   * ___
   * Sent by client to send their movement to the server.
   * 
   * Sent by the server to update the movement for other clients
   * ___
   * `Developers Notes`
   * 
   * The client can use this for a teleporting cheat unless the server has some form of movement correction enabled.
   */
  MovePlayer = "move_player",
  /**
   * `Bound To Server & Client`
   * ___
   * Sent by the client when it jumps while riding an entity that has the WASDControlled entity flag set, for example when riding a horse.
   * 
   * According to MiNET this can also be sent from the server to the client, but details on this are unknown.
   */
  RiderJump = "rider_jump",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server to update a block client-side without resending the entire chunk that the block is located in. It is particularly useful for small modifications like block breaking/placing.
   */
  UpdateBlock = "update_block",
  /**
   * `Bound To Client`
   * ___
   * Similar to `AddEntity` except its for adding a painting.
   * 
   * ¯\\\_(ツ)\_/¯
   */
  AddPainting = "add_painting",
  /**
   * `Bound To Server & Client`
   * ___
   * Sent by the client and the server to maintain a synchronized server-authoritative tick between the client and the server. The client sends this packet first, and the server should reply with another one of these packets including the response time. This send/response loop should be set at an interval to maintain synchronization.
   */
  TickSync = "tick_sync",
  /**
   * `Bound To Server & Client`
   * ___
   * Client communicates to server it made a sound server does same back.
   */
  LevelSoundEventOld = "level_sound_event_old",
  /**
   * `Bound To Client`
   * ___
   * Instead of player sending it made a sound to the server like `LevelSoundEventOld`. The server controls all sounds now.
   */
  LevelEvent = "level_event",
  /**
   * `Bound To Client`
   * ___
   * Has something to do with block state change and/or blocks the cause a sound event.
   */
  BlockEvent = "block_event",
  /**
   * `Bound To Server & Client`
   * ___
   * Something to do with triggering an entities events. EG: when two mobs make a baby it emits an event that causes heart particles.
   */
  EntityEvent = "entity_event",
  /**
   * `Bound To Client`
   * ___
   * Sent by server to tell client-side to start emitting a paricle effect from an entity.
   */
  MobEffect = "mob_effect",
  /**
   * `Bound To Client`
   * ___
   * Sent by server to update the clients arributes. I assume this has to do with potion effects.
   */
  UpdateAttributes = "update_attributes",
  /**
   * `Bound To Server & Client`
   * ___
   * InventoryTransaction is a packet sent by the client. It essentially exists out of multiple sub-packets,
   * each of which have something to do with the inventory in one way or another. Some of these sub-packets
   * directly relate to the inventory, others relate to interaction with the world that could potentially
   * result in a change in the inventory.
   * 
   * It is sent by the server to assumably sync the players inventory with what the server believes is your inventory,
   * however this could be wrong and it is only used so the server can add/remove/update items in the clients inventory.
   * ___
   * `Developers Notes`
   * 
   * This could be heavily exploited for things such as duplicating items, giving items, updating items nbt, enchanting items, editing item attributes, etc.
   */
  InventoryTransaction = "inventory_transaction",
  /**
   * `Bound To Server & Client`
   * ___
   * Used to update a mobs equipment. EG: Zombie has sword.
   */
  MobEquipment = "mob_equipment",
  /**
   * `Bound To Server & Client`
   * ___
   * Used to update a armor. EG: Zombie with helmet.
   */
  MobArmorEquipment = "mob_armor_equipment",
  /**
   * `Bound To Server & Client`
   * ___
   * Interact is sent by the client when it interacts with another entity in some way. It used to be used for
   * normal entity and block interaction, but this is no longer the case now.
   */
  Interact = "interact",
  /**
   * `Bound To Server`
   * ___
   * Used when client uses the pick block binding to switch to the picked block or request a transaction for the picked block.
   */
  BlockPickRequest = "block_pick_request",
  /**
   * `Bound To Server`
   * ___
   * Similar to `BlockPickRequest` except for an entity instead of a block.
   */
  EntityPickRequest = "entity_pick_request",
  /**
   * `Bound To Server`
   * ___
   * PlayerAction is sent by the client when it executes any action, for example starting to sprint, swim,
   * starting the breaking of a block, dropping an item, etc.
   */
  PlayerAction = "player_action",
  /**
   * `Bound To Client`
   * ___
   * Presumably sent when armor is damaged to update its damage value.
   */
  HurtArmor = "hurt_armor",
  /**
   * `Bound To Server & Client`
   * ___
   * Used to update an entities metadata.
   */
  SetEntityData = "set_entity_data",
  /**
   * `Bound To Server & Client`
   * ___
   * Sent by the server to change the client-side velocity of an entity. It is usually used
   * in combination with server-side movement calculation.
   * 
   * Apparently the client can send something in regards to this aswell. What it is used for it unknown.
   */
  SetEntityMotion = "set_entity_motion",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server to initiate an entity link client-side, meaning one entity will start
   * riding another.
   */
  SetEntityLink = "set_entity_link",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server to set the health of the client.
   * This packet should no longer be used. Instead, the health attribute should be used so that the health and maximum health may be changed directly.
   */
  SetHealth = "set_health",
  /**
   * `Bound To Client`
   * ___
   * Sent by server when client spawn position is set.
   */
  SetSpawnPosition = "set_spawn_position",
  /**
   * `Bound To Server & Client`
   * ___
   * Sent by the server to send a client animation from one client to all viewers of that client.
   * Sent by the client to tell the server it has started an animation.
   */
  Animate = "animate",
  /**
   * `Bound To Server & Client`
   * ___
   * Sent when a player needs to respawn. Exact usage for client & server is unclear.
   */
  Respawn = "respawn",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server to open a container client-side. This container must be physically
   * present in the world, for the packet to have any effect. Unlike Java Edition, Bedrock Edition requires that
   * chests for example must be present and in range to open its inventory.
   */
  ContainerOpen = "container_open",
  /**
   * `Bound To Server & Client`
   * ___
   * Sent by the server to close a container the player currently has opened, which was opened
   * using the ContainerOpen packet, or by the client to tell the server it closed a particular container, such
   * as the crafting grid.
   */
  ContainerClose = "container_close",
  /**
   * `Bound To Server & Client`
   * ___
   * Sent by the server to the client. It used to be used to link hot bar slots of the player to
   * actual slots in the inventory, but as of 1.2, this was changed and hot bar slots are no longer a free
   * floating part of the inventory.
   * Since 1.2, the packet has been re-purposed, but its new functionality is not clear.
   */
  PlayerHotbar = "player_hotbar",
  /**
   * `Bound To Server & Client`
   * ___
   * Sent by the server to update the full content of a particular inventory. It is usually
   * sent for the main inventory of the player, but also works for other inventories that are currently opened
   * by the player.
   */
  InventoryContent = "inventory_content",
  /**
   * `Bound To Server & Client`
   * ___
   * Sent by the server to update a single slot in one of the inventory windows that the client
   * currently has opened. Usually this is the main inventory, but it may also be the off hand or, for example,
   * a chest inventory.
   */
  InventorySlot = "inventory_slot",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server to update specific data of a single container, meaning a block such
   * as a furnace or a brewing stand. This data is usually used by the client to display certain features
   * client-side.
   */
  ContainerSetData = "container_set_data",
  /**
   * `Bound To Client`
   * ___
   * Presumably sent by the server describing all recipes. Exact usage unknown.
   */
  CraftingData = "crafting_data",
  /**
   * `Bound To Server & Client`
   * ___
   * Sent by the client when it crafts a particular item. Note that this packet may be fully
   * ignored, as the InventoryTransaction packet provides all the information required.
   * 
   * Unknown when or why it is sent by server
   */
  CraftingEvent = "crafting_event",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server to make the client 'select' a hot bar slot. It currently appears to
   * be broken however, and does not actually set the selected slot to the hot bar slot set in the packet.
   */
  GUIDataPickItem = "gui_data_pick_item",
  /**
   * `Bound To Server & Client`
   * ___
   * Sent by the server to update game-play related features, in particular permissions to
   * access these features for the client. It includes allowing the player to fly, build and mine, and attack
   * entities. Most of these flags should be checked server-side instead of using this packet only.
   * The client may also send this packet to the server when it updates one of these settings through the
   * in-game settings interface. The server should verify if the player actually has permission to update those
   * settings.
   */
  AdventureSettings = "adventure_settings",
  /**
   * `Bound To Server & Client`
   * ___
   * Presumably sent by the server & client to update a blocks nbt.
   */
  BlockEntityData = "block_entity_data",
  /**
   * `Bound To Server`
   * ___
   * Seems like an more precise version of `MovePlayer`. It appears to be a way to tell the server the current input.
   * 
   * EG: Moving 0.5x will continue moving you at 0.5x until another packet is sent saying client is now moving at 0x
   */
  PlayerInput = "player_input",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server to provide the client with a chunk of a world data (16xYx16 blocks).
   * Typically a certain amount of chunks is sent to the client before sending it the spawn PlayStatus packet,
   * so that the client spawns in a loaded world.
   */
  LevelChunk = "level_chunk",
  /**
   * `Bound To Client`
   * ___
   * Sent by server to tell client whether or not to render all commands client-side.
   */
  SetCommandsEnabled = "set_commands_enabled",
  /**
   * `Bound To Client`
   * ___
   * Sent by server to tell client currently difficulty presumably.
   */
  SetDifficulty = "set_difficulty",
  /**
   * `Bound To Client`
   * ___
   * Sent by server to tell client currently dimension presumably.
   */
  ChangeDimension = "change_dimension",
  /**
   * `Bound To Server & Client`
   * ___
   * Sent by the server to update the game type (game mode) of the player.
   * 
   * Can also be sent by client to request a gamemode update. Server should verify client has the correct permissions to do so first.
   */
  SetPlayerGameType = "set_player_game_type",
  /**
   * `Bound To Client`
   * ___
   * Sent by server containing an array of all the current players. Usually used by client to display all users in a playerlist in the pause menu.
   */
  PlayerList = "player_list",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server to send an event. It is typically sent to the client for
   * telemetry reasons.
   */
  SimpleEvent = "simple_event",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server to send an event with additional data. It is typically sent to the client for
   * telemetry reasons.
   */
  Event = "event",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server to summon and render a exp orb client-side.
   */
  SpawnExperienceOrb = "spawn_experience_orb",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server to the client to update the data of a map shown to the client.
   * It is sent with a combination of flags that specify what data is updated.
   * The `ClientBoundMapItemData` packet may be used to update specific parts of the map only. It is not required
   * to send the entire map each time when updating one part.
   */
  ClientboundMapItemData = "clientbound_map_item_data",
  /**
   * `Bound To Server & Client`
   * ___
   * Used to request the data of a map.
   */
  MapInfoRequest = "map_info_request",
  /**
   * `Bound To Server & Client`
   * ___
   * Sent by the client to the server to update the server on the chunk view radius that
   * it has set in the settings. The server may respond with a `ChunkRadiusUpdated` packet with either the chunk
   * radius requested, or a different chunk radius if the server chooses so.
   */
  RequestChunkRadius = "request_chunk_radius",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server in response to a `RequestChunkRadius` packet. It defines the chunk
   * radius that the server allows the client to have. This may be lower than the chunk radius requested by the
   * client in the RequestChunkRadius packet.
   */
  ChunkRadiusUpdate = "chunk_radius_update",
  /**
   * `Bound To Server & Client`
   * ___
   * Sent when an item in an item frame is dropped presumably.
   */
  ItemFrameDropItem = "item_frame_drop_item",
  /**
   * `Bound To Client`
   * ___
   * Sent by server to update game rules client side.
   */
  GameRulesChanged = "game_rules_changed",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server to use an Education Edition camera on a player. It produces an image client-side.
   */
  Camera = "camera",
  /**
   * `Bound To Server & Client`
   * ___
   * Used to set boss event data.
   * Sent by the server to presumably update the client and vice-versa.
   */
  BossEvent = "boss_event",
  /**
   * `Bound To Client`
   * ___
   * Send by server to show the client the credits screen.
   */
  ShowCredits = "show_credits",
  /**
   * `Bound To Client`
   * ___
   * Sends a list of commands to the client. Commands can have
   * arguments, and some of those arguments can have 'enum' values, which are a list of possible
   * values for the argument. The serialization is rather complex and involves palettes like chunks.
   */
  AvailableCommands = "available_commands",
  /**
   * `Bound To Server`
   * ___
   * Sent by the client to request the execution of a server-side command. Although some
   * servers support sending commands using the Text packet, this packet is guaranteed to have the correct
   * result.
   */
  CommandRequest = "command_request",
  /**
   * `Bound To Server`
   * ___
   * Sent by the client to update a command block at a specific position. The command
   * block may be either a physical block or an entity.
   */
  CommandBlockUpdate = "command_block_update",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server containing the results of a command executed. 
   * It is assumed this includes all commands executed even if not by the client listening for outputs,
   * however, this is unknown.
   */
  CommandOutput = "command_output",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server to update the trades offered by a villager to a player. It is sent at the
   * moment that a player interacts with a villager.
   */
  UpdateTrade = "update_trade",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server to the client upon opening a horse inventory. It is used to set the
   * content of the inventory and specify additional properties, such as the items that are allowed to be put
   * in slots of the inventory.
   */
  UpdateEquipment = "update_equipment",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server to the client to inform the client about the data contained in
   * one of the resource packs that are about to be sent.
   */
  ResourcePackDataInfo = "resource_pack_data_info",
  /**
   * `Bound To Client`
   * ___
   * Sent to the client so that the client can download the resource pack. Each packet
   * holds a chunk of the compressed resource pack, of which the size is defined in the `ResourcePackDataInfo`
   * packet sent before.
   */
  ResourcePackChunkData = "resource_pack_chunk_data",
  /**
   * `Bound To Server`
   * ___
   * Sent by the client to request a chunk of data from a particular resource pack,
   * that it has obtained information about in a `ResourcePackDataInfo` packet.
   */
  ResourcePackChunkRequest = "resource_pack_chunk_request",
  /**
   * `Bound To Client`
   * ___
   * Sent by server to transfer client to another server.
   */
  Transfer = "transfer",
  /**
   * `Bound To Client`
   * ___
   * Sent by server to start playing a sound client-side.
   */
  PlaySound = "play_sound",
  /**
   * `Bound To Client`
   * ___
   * Sent by server to stop playing a sound client-side.
   */
  StopSound = "stop_sound",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server to make a title, subtitle or action bar shown to a player. It has several
   * fields that allow setting the duration of the titles.
   */
  SetTitle = "set_title",
  /**
   * `Bound To Client`
   * ___
   * Packet usage is unknown.
   */
  AddBehaviorTree = "add_behavior_tree",
  /**
   * `Bound To Client`
   * ___
   * Sent by the client when it updates a structure block using the in-game UI. The
   * data it contains depends on the type of structure block that it is. In Minecraft Bedrock Edition v1.11,
   * there is only the Export structure block type, but in v1.13 the ones present in Java Edition will,
   * according to the wiki, be added too.
   */
  StructureBlockUpdate = "structure_block_update",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server to show a Marketplace store offer to a player. It opens a window
   * client-side that displays the item.
   * The `ShowStoreOffer` packet only works on the partnered servers: Servers that are not partnered will not have
   * store buttons show up in the in-game pause menu and will, as a result, not be able to open store offers
   * a store buttons show up in the in-game pause menu and will, as a result, not be able to open store offers
   * with the domain of one of the partnered servers.
   */
  ShowStoreOffer = "show_store_offer",
  /**
   * `Bound To Server`
   * ___
   * Sent by the client to the server to notify the server it purchased an item from the
   * Marketplace store that was offered by the server. The packet is only used for partnered servers.
   */
  PurchaseReceipt = "purchase_receipt",
  /**
   * `Bound To Server & Client`
   * ___
   * Presumably sent by both sides to update a clients skin.
   */
  PlayerSkin = "player_skin",
  /**
   * `Bound To Client`
   * ___
   * Sent when a sub-client joins the server while another client is already connected to it.
   * The packet is sent as a result of split-screen game play, and allows up to four players to play using the
   * same network connection. After an initial Login packet from the 'main' client, each sub-client that
   * connects sends a `SubClientLogin` to request their own login.
   */
  SubClientLogin = "sub_client_login",
  /**
   * `Bound To Client`
   * ___
   * Is used to make the client connect to a custom websocket server. Websockets have the ability to execute commands on behalf of the client
   * along with listening to a handful of events that get fired on the client side.
   */
  InitiateWebSocketConnection = "initiate_web_socket_connection",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server to let the client know what entity type it was last hurt by. At this
   * moment, the packet is useless and should not be used. There is no behaviour that depends on if this
   * packet is sent or not.
   */
  SetLastHurtBy = "set_last_hurt_by",
  /**
   * `Bound To Server & Client`
   * ___
   * Sent by the client when it edits a book. It is sent each time a modification was made and the
   * player stops its typing 'session', rather than simply after closing the book.
   */
  BookEdit = "book_edit",
  /**
   * `Bound To Server & Client`
   * ___
   * Sent by the client when it interacts with an NPC.
   * The packet is specifically made for Education Edition, where NPCs are available to use.
   * As of recent update NPCs are now available in the production build of mcbe.
   */
  NPCRequest = "npc_request",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server to transfer a photo (image) file to the client. It is typically used
   * to transfer photos so that the client can display it in a portfolio in Education Edition.
   * While previously usable in the default Bedrock Edition, the displaying of photos in books was disabled and
   * the packet now has little use anymore.
   */
  PhotoTransfer = "photo_transfer",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server to make the client open a form. This form may be either a modal form
   * which has two options, a menu form for a selection of options and a custom form for properties.
   */
  ModalFormRequest = "modal_form_request",
  /**
   * `Bound To Server`
   * ___
   * Sent by the client in response to a `ModalFormRequest`, after the player has submitted
   * the form sent. It contains the options/properties selected by the player, or a JSON encoded 'null' if
   * the form was closed by clicking the X at the top right corner of the form.
   */
  ModalFormResponse = "modal_form_response",
  /**
   * `Bound To Server`
   * ___
   * Sent by the client to request the settings specific to the server. These settings
   * are shown in a separate tab client-side, and have the same structure as a custom form.
   * `ServerSettingsRequest` has no fields.
   */
  ServerSettingsRequest = "server_settings_request",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server in response to a `ServerSettingsRequest` from the
   * client. It is structured the same as a `ModalFormRequest` packet, and if filled out correctly, will show
   * a specific tab for the server in the settings of the client. A `ModalFormResponse` packet is sent by the
   * client in response to a ServerSettingsResponse, when the client fills out the settings and closes the
   * settings again.
   */
  ServerSettingsResponse = "server_settings_response",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server to show the XBOX Live profile of one player to another.
   */
  ShowProfile = "show_profile",
  /**
   * `Bound To Server & Client`
   * ___
   * Sent by the client when it toggles the default game type in the settings UI, and is
   * sent by the server when it actually changes the default game type, resulting in the toggle being changed
   * in the settings UI.
   */
  SetDefaultGameType = "set_default_game_type",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server to remove a scoreboard objective. It is used to stop showing a
   * scoreboard to a player.
   */
  RemoveObjective = "remove_objective",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server to display an object as a scoreboard to the player. Once sent,
   * it should be followed up by a `SetScore` packet to set the lines of the packet.
   */
  SetDisplayObjective = "set_display_objective",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server to send the contents of a scoreboard to the player. It may be used to either
   * add, remove or edit entries on the scoreboard.
   */
  SetScore = "set_score",
  /**
   * `Bound To Server & Client`
   * ___
   * Sent by the client to let the server know it started a chemical reaction in Education Edition,
   * and is sent by the server to other clients to show the effects.
   * The packet is only functional if Education features are enabled.
   */
  LabTable = "lab_table",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server to synchronise the falling of a falling block entity with the
   * transitioning back and forth from and to a solid block. It is used to prevent the entity from flickering,
   * and is used in places such as the pushing of blocks with pistons.
   */
  UpdateBlockSynced = "update_block_synced",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server to move an entity. The packet is specifically optimised to save as
   * much space as possible, by only writing non-zero fields.
   * As of 1.16.100, this packet no longer actually contains any deltas.
   */
  MoveEntityDelta = "move_entity_delta",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server to change the identity type of one of the entries on a
   * scoreboard. This is used to change, for example, an entry pointing to a player, to a fake player when it
   * leaves the server, and to change it back to a real player when it joins again.
   * In non-vanilla situations, the packet is quite useless.
   */
  SetScoreboardIdentity = "set_scoreboard_identity",
  /**
   * `Bound To Server`
   * ___
   * Sent by the client in response to a PlayStatus packet with the status set
   * to spawn. The packet marks the moment at which the client is fully initialised and can receive any packet
   * without discarding it.
   */
  SetLocalPlayerAsInitialized = "set_local_player_as_initialized",
  /**
   * `Bound To Client`
   * ___
   * Packet usage is unknown.
   */
  UpdateSoftEnum = "update_soft_enum",
  /**
   * `Bound To Server & Client`
   * ___
   * Sent by the server (and the client, on development builds) to measure the latency
   * over the entire Minecraft stack, rather than the RakNet latency. It has other usages too, such as the
   * ability to be used as some kind of acknowledgement packet, to know when the client has received a certain
   * other packet.
   */
  NetworkStackLatency = "network_stack_latency",
  /**
   * `Bound To Server & Client`
   * ___
   * Sent by both the client and the server. It is a way to let scripts communicate with
   * the server, so that the client can let the server know it triggered an event, or the other way around.
   * It is essentially an RPC kind of system.
   */
  ScriptCustomEvent = "script_custom_event",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server to spawn a particle effect client-side. Unlike other packets that
   * result in the appearing of particles, this packet can show particles that are not hardcoded in the client.
   * They can be added and changed through behaviour packs to implement custom particles.
   */
  SpawnParticleEffect = "spawn_particle_effect",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server at the start of the game to let the client know all
   * entities that are available on the server.
   */
  AvailableEntityIdentifiers = "available_entity_identifiers",
  /**
   * `Bound To Server & Client`
   * ___
   * Not used. Use `LevelSoundEvent`
   */
  LevelSoundEventV2 = "level_sound_event_v2",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server to change the point around which chunks are and remain
   * loaded. This is useful for mini-game servers, where only one area is ever loaded, in which case the
   * `NetworkChunkPublisherUpdate` packet can be sent in the middle of it, so that no chunks ever need to be
   * additionally sent during the course of the game.
   * In reality, the packet is not extraordinarily useful, and most servers just send it constantly at the
   * position of the player.
   * If the packet is not sent at all, no chunks will be shown to the player, regardless of where they are sent.
   */
  NetworkChunkPublisherUpdate = "network_chunk_publisher_update",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server to let the client know all biomes that are available and
   * implemented on the server side. It is much like the `AvailableActorIdentifiers` packet, but instead
   * functions for biomes.
   */
  BiomeDefinitionList = "biome_definition_list",
  /**
   * `Bound To Server & Client`
   * ___
   * Sent by the server to make any kind of built-in sound heard to a player. It is sent to,
   * for example, play a stepping sound or a shear sound. The packet is also sent by the client, in which case
   * it could be forwarded by the server to the other players online. If possible, the packets from the client
   * should be ignored however, and the server should play them on its own accord.
   */
  LevelSoundEvent = "level_sound_event",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server to send a 'generic' level event to the client. This packet sends an
   * NBT serialised object and may for that reason be used for any event holding additional data.
   */
  LevelEventGeneric = "level_event_generic",
  /**
   * `Bound To Client`
   * ___
   * Sent by the client to update the server on which page was opened in a book on a lectern,
   * or if the book should be removed from it.
   */
  LecternUpdate = "lectern_update",
  /**
   * `Bound To Client`
   * ___
   * This packet was removed when mixer died presumably.
   */
  VideoStreamConnect = "video_stream_connect",
  /**
   * `Bound To Client`
   * ___
   * This is NOT a Minecraft entity, but an entity in the Entity Component System (ECS)
   * for the game engine Minecrat Bedrock uses. Internally, all 'Minecraft entities' are
   * known as Actors including in packet names and fields. However, these are irrelevant
   * internal details so we don't do the renames in these protocol definitions, for simplicity we just use Entity.
   * ___
   * Sent by the server to the client. Its function is not entirely clear: It does not add an
   * entity in the sense of an in-game entity, but has to do with the ECS that Minecraft uses.
   */
  AddEcsEntity = "add_ecs_entity",
  /**
   * `Bound To Client`
   * ___
   * sent by the server to the client. Its function is not entirely clear: It does not remove an
   * entity in the sense of an in-game entity, but has to do with the ECS that Minecraft uses.
   */
  RemoveEcsEntity = "remove_ecs_entity",
  /**
   * `Bound To Server & Client`
   * ___
   * Sent by the client to the server at the start of the game. It is sent to let the
   * server know if it supports the client-side blob cache. Clients such as Nintendo Switch do not support the
   * cache, and attempting to use it anyway will fail.
   */
  ClientCacheStatus = "client_cache_status",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server to show a certain animation on the screen of the player.
   * The packet is used, as an example, for when a raid is triggered and when a raid is defeated.
   */
  OnScreenTextureAnimation = "on_screen_texture_animation",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server to create a locked copy of one map into another map. In vanilla,
   * it is used in the cartography table to create a map that is locked and cannot be modified.
   */
  MapCreateLockedCopy = "map_create_locked_copy",
  /**
   * `Bound To Client`
   * ___
   * Sent by the client to request data of a structure.
   */
  StructureTemplateDataExportRequest = "structure_template_data_export_request",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server to send data of a structure to the client in response
   * to a `StructureTemplateDataRequest` packet.
   */
  StructureTemplateDataExportResponse = "structure_template_data_export_response",
  /**
   * `Bound To Client`
   * ___
   * No longer used.
   */
  UpdateBlockProperties = "update_block_properties",
  /**
   * `Bound To Server`
   * ___
   * Part of the blob cache protocol. It is sent by the client to let the server know
   * what blobs it needs and which blobs it already has, in an ACK type system.
   */
  ClientCacheBlobStatus = "client_cache_blob_status",
  /**
   * `Bound To Client`
   * ___
   * Part of the blob cache protocol. It is sent by the server in response to a
   * `ClientCacheBlobStatus` packet and contains the blob data of all blobs that the client acknowledged not to
   * have yet.
   */
  ClientCacheMissResponse = "client_cache_miss_response",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server to update Minecraft: Education Edition related settings.
   * It is unused by the normal base game as far as we know.
   */
  EducationSettings = "education_settings",
  /**
   * `Bound To Server & Client`
   * ___
   * Sent by the client to update multi-player related settings server-side and sent back
   * to online players by the server.
   * The `MultiPlayerSettings` packet is a Minecraft: Education Edition packet. It has no functionality for the
   * base game.
   */
  MultiplayerSettings = "multiplayer_settings",
  /**
   * `Bound To Server`
   * ___
   * Sent by the client when it changes a setting in the settings that results in the issuing
   * of a command to the server, such as when Show Coordinates is enabled.
   */
  SettingsCommand = "settings_command",
  /**
   * `Bound To Server`
   * ___
   * Sent by the client to request the dealing damage to an anvil. This packet is completely
   * pointless and the server should never listen to it.
   */
  AnvilDamage = "anvil_damage",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server to tell the client that it should be done using the item it is
   * currently using.
   */
  CompletedUsingItem = "completed_using_item",
  /**
   * `Bound To Server & Client`
   * ___
   * Sent by the server to update a variety of network settings. These settings modify the
   * way packets are sent over the network stack.
   */
  NetworkSettings = "network_settings",
  /**
   * `Bound To Server`
   * ___
   * Sent by the client to allow for server authoritative movement. It is used to synchronise
   * the player input with the position server-side.
   * The client sends this packet when the `ServerAuthoritativeMovementMode` field in the `StartGame` packet is set
   * to true, instead of the `MovePlayer` packet. The client will send this packet once every tick.
   */
  PlayerAuthInput = "player_auth_input",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server to set the creative inventory's content for a player
   * Introduced in 1.16, this packet replaces the previous method - sending an `InventoryContent` packet with
   * creative inventory window ID.
   * As of v1.16.100, this packet must be sent during the login sequence. Not sending it will stop the client
   * from joining the server.
   */
  CreativeContent = "creative_content",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server to update the enchantment options displayed when the user opens
   * the enchantment table and puts an item in. This packet was added in 1.16 and allows the server to decide on
   * the enchantments that can be selected by the player.
   * The `PlayerEnchantOptions` packet should be sent once for every slot update of the enchantment table. The
   * vanilla server sends an empty `PlayerEnchantOptions` packet when the player opens the enchantment table
   * (air is present in the enchantment table slot) and sends the packet with actual enchantments in it when
   * items are put in that can have enchantments.
   */
  PlayerEnchantOptions = "player_enchant_options",
  /**
   * `Bound To Server`
   * ___
   * Sent by the client to change item stacks in an inventory. It is essentially a
   * replacement of the `InventoryTransaction` packet added in 1.16 for inventory specific actions, such as moving
   * items around or crafting. The `InventoryTransaction` packet is still used for actions such as placing blocks
   * and interacting with entities.
   */
  ItemStackRequest = "item_stack_request",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server in response to an `ItemStackRequest` packet from the client. This
   * packet is used to either approve or reject ItemStackRequests from the client. If a request is approved, the
   * client will simply continue as normal. If rejected, the client will undo the actions so that the inventory
   * should be in sync with the server again.
   */
  ItemStackResponse = "item_stack_response",
  /** 
   * `Bound To Client`
   * ___
   * Sent by the server to damage the armour of a player. It is a very efficient packet,
   * but generally it's much easier to just send a slot update for the damaged armour.
   */
  PlayerArmorDamage = "player_armor_damage",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server to change the game mode of a player. It is functionally
   * identical to the `SetPlayerGameType` packet.
   */
  UpdatePlayerGameType = "update_player_game_type",
  /**
   * `Bound To Server`
   * ___
   * Sent by the client to request the position and dimension of a
   * 'tracking ID'. These IDs are tracked in a database by the server. In 1.16, this is used for lodestones.
   * The client will send this request to find the position a lodestone compass needs to point to. If found, it
   * will point to the lodestone. If not, it will start spinning around.
   * A `PositionTrackingDBServerBroadcast` packet should be sent in response to this packet.
   */
  PositionTrackingDBRequest = "position_tracking_db_request",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server in response to the
   * `PositionTrackingDBClientRequest` packet. This packet is, as of 1.16, currently only used for lodestones. The
   * server maintains a database with tracking IDs and their position and dimension. The client will request
   * these tracking IDs, (NBT tag set on the lodestone compass with the tracking ID?) and the server will
   * respond with the status of those tracking IDs.
   * What is actually done with the data sent depends on what the client chooses to do with it. For the
   * lodestone compass, it is used to make the compass point towards lodestones and to make it spin if the
   * lodestone at a position is no longer there.
   */
  PositionTrackingDBBroadcast = "position_tracking_db_broadcast",
  /**
   * `Bound To Server`
   * ___
   * Sent by the client when it receives an invalid packet from the server. It holds
   * some information on the error that occurred.
   */
  PacketViolationWarning = "packet_violation_warning",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server to the client. There is a predictive movement component for
   * entities. This packet fills the "history" of that component and entity movement is computed based on the
   * points. Vanilla sends this packet instead of the `SetActorMotion` packet when 'spatial optimisations' are
   * enabled.
   */
  MotionPredictionHints = "motion_prediction_hints",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server to animate an entity client-side. It may be used to play a single
   * animation, or to activate a controller which can start a sequence of animations based on different
   * conditions specified in an animation controller.
   * Much of the documentation of this packet can be found at
   * https://minecraft.gamepedia.com/Bedrock_Edition_beta_animation_documentation.
   */
  AnimateEntity = "animate_entity",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server to make the camera shake client-side. This feature was added for map-making partners.
   */
  CameraShake = "camera_shake",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server to render the different fogs in the Stack. The types of fog are controlled
   * by resource packs to change how they are rendered, and the ability to create custom fog.
   */
  PlayerFog = "player_fog",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server if and only if `StartGame.ServerAuthoritativeMovementMode`
   * is set to `AuthoritativeMovementModeServerWithRewind`. The packet is used to correct movement at a specific
   * point in time.
   */
  CorrectPlayerMovePrediction = "correct_player_move_prediction",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server to attach client-side components to a custom item.
   */
  ItemComponent = "item_component",
  /**
   * `Bound To Server & Client`
   * ___
   * Sent by the both the client and the server. The client sends the packet to the server to
   * allow the server to filter the text server-side. The server then responds with the same packet and the
   * safer version of the text.
   */
  FilterTextPacket = "filter_text_packet",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server to spawn an outlined cube on client-side.
   */
  DebugRenderer = "debug_renderer",
  /**
   * `Bound To Client`
   * ___
   * Sent by the server to synchronize/update entity properties as NBT, an alternative to Set Entity Data.
   */
  SyncEntityProperty = "sync_entity_property",
  /**
   * `Bound To Client`
   * ___
   * Sends a volume entity's definition and components from server to client.
   */
  AddVolumeEntity = "add_volume_entity",
  /**
   * `Bound To Client`
   * ___
   * Indicates a volume entity to be removed from server to client.
   */
  RemoveVolumeEntity = "remove_volume_entity",
  /**
   * `Bound Unknown`
   * ___
   * In-progress packet. We currently do not know the use case.
   */
  SimulationType = "simulation_type",
  /**
   * `Bound Unknown`
   * ___
   * Packet that allows the client to display dialog boxes for interacting with NPCs.
   */
  NPC_Dialogue = "npc_dialogue",
}

export interface ClientBoundPackets {
  "play_status": [packet_play_status]
  "server_to_client_handshake": [packet_server_to_client_handshake]
  "disconnect": [packet_disconnect]
  "resource_packs_info": [packet_resource_packs_info]
  "resource_pack_stack": [packet_resource_pack_stack]
  "set_time": [packet_set_time]
  "start_game": [packet_start_game]
  "add_player": [packet_add_player]
  "add_entity": [packet_add_entity]
  "remove_entity": [packet_remove_entity]
  "add_item_entity": [packet_add_item_entity]
  "take_item_entity": [packet_take_item_entity]
  "update_block": [packet_update_block]
  "add_painting": [packet_add_painting]
  "level_event": [packet_level_event]
  "block_event": [packet_block_event]
  "mob_effect": [packet_mob_effect]
  "update_attributes": [packet_update_attributes]
  "hurt_armor": [packet_hurt_armor]
  "set_entity_link": [packet_set_entity_link]
  "set_health": [packet_set_health]
  "set_spawn_position": [packet_set_spawn_position]
  "container_open": [packet_container_open]
  "container_set_data": [packet_container_set_data]
  "crafting_data": [packet_crafting_data]
  "gui_data_pick_item": [packet_gui_data_pick_item]
  "level_chunk": [packet_level_chunk]
  "set_commands_enabled": [packet_set_commands_enabled]
  "set_difficulty": [packet_set_difficulty]
  "change_dimension": [packet_change_dimension]
  "player_list": [packet_player_list]
  "simple_event": [packet_simple_event]
  "event": [packet_event]
  "spawn_experience_orb": [packet_spawn_experience_orb]
  "clientbound_map_item_data": [packet_clientbound_map_item_data]
  "chunk_radius_update": [packet_chunk_radius_update]
  "game_rules_changed": [packet_game_rules_changed]
  "camera": [packet_camera]
  "show_credits": [packet_show_credits]
  "available_commands": [packet_available_commands]
  "command_output": [packet_command_output]
  "update_trade": [packet_update_trade]
  "update_equipment": [packet_update_equipment]
  "resource_pack_data_info": [packet_resource_pack_data_info]
  "resource_pack_chunk_data": [packet_resource_pack_chunk_data]
  "transfer": [packet_transfer]
  "play_sound": [packet_play_sound]
  "stop_sound": [packet_stop_sound]
  "set_title": [packet_set_title]
  "add_behavior_tree": [packet_add_behavior_tree]
  "structure_block_update": [packet_structure_block_update]
  "show_store_offer": [packet_show_store_offer]
  "sub_client_login": [packet_sub_client_login]
  "initiate_web_socket_connection": [packet_initiate_web_socket_connection]
  "set_last_hurt_by": [packet_set_last_hurt_by]
  "photo_transfer": [packet_photo_transfer]
  "modal_form_request": [packet_modal_form_request]
  "server_settings_response": [packet_server_settings_response]
  "show_profile": [packet_show_profile]
  "remove_objective": [packet_remove_objective]
  "set_display_objective": [packet_set_display_objective]
  "set_score": [packet_set_score]
  "update_block_synced": [packet_update_block_synced]
  "move_entity_delta": [packet_move_entity_delta]
  "set_scoreboard_identity": [packet_set_scoreboard_identity]
  "update_soft_enum": [packet_update_soft_enum]
  "spawn_particle_effect": [packet_spawn_particle_effect]
  "available_entity_identifiers": [packet_available_entity_identifiers]
  "network_chunk_publisher_update": [packet_network_chunk_publisher_update]
  "biome_definition_list": [packet_biome_definition_list]
  "level_event_generic": [packet_level_event_generic]
  "lectern_update": [packet_lectern_update]
  "video_stream_connect": [packet_video_stream_connect]
  "add_ecs_entity": [packet_add_ecs_entity]
  "remove_ecs_entity": [packet_remove_ecs_entity]
  "on_screen_texture_animation": [packet_on_screen_texture_animation]
  "map_create_locked_copy": [packet_map_create_locked_copy]
  "structure_template_data_export_request": [packet_structure_template_data_export_request]
  "structure_template_data_export_response": [packet_structure_template_data_export_response]
  "update_block_properties": [packet_update_block_properties]
  "client_cache_miss_response": [packet_client_cache_miss_response]
  "education_settings": [packet_education_settings]
  "completed_using_item": [packet_completed_using_item]
  "creative_content": [packet_creative_content]
  "player_enchant_options": [packet_player_enchant_options]
  "item_stack_response": [packet_item_stack_response]
  "player_armor_damage": [packet_player_armor_damage]
  "update_player_game_type": [packet_update_player_game_type]
  "position_tracking_db_broadcast": [packet_position_tracking_db_broadcast]
  "motion_prediction_hints": [packet_motion_prediction_hints]
  "animate_entity": [packet_animate_entity]
  "camera_shake": [packet_camera_shake]
  "player_fog": [packet_player_fog]
  "correct_player_move_prediction": [packet_correct_player_move_prediction]
  "item_component": [packet_item_component]
  "debug_renderer": [packet_debug_renderer]
  "sync_entity_property": [packet_sync_entity_property]
  "add_volume_entity": [packet_add_volume_entity]
  "remove_volume_entity": [packet_remove_volume_entity]
  "text": [packet_text]
  "move_entity": [packet_move_entity]
  "move_player": [packet_move_player]
  "rider_jump": [packet_rider_jump]
  "tick_sync": [packet_tick_sync]
  "level_sound_event_old": [packet_level_sound_event_old]
  "entity_event": [packet_entity_event]
  "inventory_transaction": [packet_inventory_transaction]
  "mob_equipment": [packet_mob_equipment]
  "mob_armor_equipment": [packet_mob_armor_equipment]
  "interact": [packet_interact]
  "set_entity_data": [packet_set_entity_data]
  "set_entity_motion": [packet_set_entity_motion]
  "animate": [packet_animate]
  "respawn": [packet_respawn]
  "container_close": [packet_container_close]
  "player_hotbar": [packet_player_hotbar]
  "inventory_content": [packet_inventory_content]
  "inventory_slot": [packet_inventory_slot]
  "crafting_event": [packet_crafting_event]
  "adventure_settings": [packet_adventure_settings]
  "block_entity_data": [packet_block_entity_data]
  "set_player_game_type": [packet_set_player_game_type]
  "map_info_request": [packet_map_info_request]
  "request_chunk_radius": [packet_request_chunk_radius]
  "item_frame_drop_item": [packet_item_frame_drop_item]
  "boss_event": [packet_boss_event]
  "player_skin": [packet_player_skin]
  "book_edit": [packet_book_edit]
  "npc_request": [packet_npc_request]
  "set_default_game_type": [packet_set_default_game_type]
  "lab_table": [packet_lab_table]
  "network_stack_latency": [packet_network_stack_latency]
  "script_custom_event": [packet_script_custom_event]
  "level_sound_event_v2": [packet_level_sound_event_v2]
  "level_sound_event": [packet_level_sound_event]
  "client_cache_status": [packet_client_cache_status]
  "multiplayer_settings": [packet_multiplayer_settings]
  "network_settings": [packet_network_settings]
  "filter_text_packet": [packet_filter_text_packet]

  // Our Custom Packet
  "all": [{ name: string, params: any }]
  "rak_connected": []
  "rak_closed": []
  "rak_pong": []
}
export interface ServerBoundPackets {
  "login": [packet_login]
  "client_to_server_handshake": [packet_client_to_server_handshake]
  "resource_pack_client_response": [packet_resource_pack_client_response]
  "text": [packet_text]
  "move_entity": [packet_move_entity]
  "move_player": [packet_move_player]
  "rider_jump": [packet_rider_jump]
  "tick_sync": [packet_tick_sync]
  "level_sound_event_old": [packet_level_sound_event_old]
  "entity_event": [packet_entity_event]
  "inventory_transaction": [packet_inventory_transaction]
  "mob_equipment": [packet_mob_equipment]
  "mob_armor_equipment": [packet_mob_equipment]
  "interact": [packet_interact]
  "block_pick_request": [packet_block_pick_request]
  "entity_pick_request": [packet_entity_pick_request]
  "player_action": [packet_player_action]
  "set_entity_data": [packet_set_entity_data]
  "set_entity_motion": [packet_set_entity_motion]
  "animate": [packet_animate]
  "respawn": [packet_respawn]
  "container_close": [packet_container_close]
  "player_hotbar": [packet_player_hotbar]
  "inventory_content": [packet_inventory_content]
  "inventory_slot": [packet_inventory_slot]
  "crafting_event": [packet_crafting_event]
  "adventure_settings": [packet_adventure_settings]
  "block_entity_data": [packet_block_entity_data]
  "player_input": [packet_player_input]
  "set_player_game_type": [packet_set_player_game_type]
  "map_info_request": [packet_map_info_request]
  "request_chunk_radius": [packet_request_chunk_radius]
  "item_frame_drop_item": [packet_item_frame_drop_item]
  "boss_event": [packet_boss_event]
  "command_request": [packet_command_request]
  "command_block_update": [packet_command_block_update]
  "resource_pack_chunk_request": [packet_resource_pack_chunk_request]
  "purchase_receipt": [packet_purchase_receipt]
  "player_skin": [packet_player_skin]
  "book_edit": [packet_book_edit]
  "npc_request": [packet_npc_request]
  "modal_form_response": [packet_modal_form_response]
  "server_settings_request": [packet_server_settings_request]
  "set_default_game_type": [packet_set_default_game_type]
  "lab_table": [packet_lab_table]
  "set_local_player_as_initialized": [packet_set_local_player_as_initialized]
  "network_stack_latency": [packet_network_stack_latency]
  "script_custom_event": [packet_script_custom_event]
  "level_sound_event_v2": [packet_level_sound_event_v2]
  "level_sound_event": [packet_level_sound_event]
  "client_cache_status": [packet_client_cache_status]
  "client_cache_blob_status": [packet_client_cache_blob_status]
  "multiplayer_settings": [packet_multiplayer_settings]
  "settings_command": [packet_settings_command]
  "anvil_damage": [packet_anvil_damage]
  "network_settings": [packet_network_settings]
  "player_auth_input": [packet_player_auth_input]
  "item_stack_request": [packet_item_stack_request]
  "position_tracking_db_request": [packet_position_tracking_db_request]
  "packet_violation_warning": [packet_packet_violation_warning]
  "filter_text_packet": [packet_filter_text_packet]
}

/**
 * !id: 0x01
 * !bound: server
 */
export interface packet_login {
  protocol_version: i32
  tokens: LoginTokens
}
/**
 * !id: 0x02
 * !bound: client
 */
export interface packet_play_status {
  status: PlayStatusTypes
}
/**
 * !id: 0x03
 * !bound: client
 */
export interface packet_server_to_client_handshake {
  token: string
}
/**
 * !id: 0x04
 * !bound: client
 */
export interface packet_client_to_server_handshake {}
/**
 * !id: 0x05
 * !bound: client
 */
export interface packet_disconnect {
  hide_disconnect_reason: bool
  message: string
}
/**
 * !id: 0x06
 * !bound: client
 */
export interface packet_resource_packs_info {
  must_accept: bool
  has_scripts: bool
  force_server_packs: bool
  behaviour_packs: BehaviorPackInfos
  texture_packs: TexturePackInfos
}
/**
 * !id: 0x07
 * !bound: client
 */
export interface packet_resource_pack_stack {
  must_accept: bool
  behavior_packs: ResourcePackIdVersions
  resource_packs: ResourcePackIdVersions
  game_version: string
  experiments: Experiments
  experiments_previously_used: bool
}
/**
 * !id: 0x08
 * !bound: server
 */
export interface packet_resource_pack_client_response {
  response_status: ResourcePackClientResponseStatus
  resourcepackids: ResourcePackIds
}
/**
 * !id: 0x09
 * !bound: both
 */
export interface packet_text {
  type: TextType
  needs_translation: bool
  message: string
  xuid: string
  platform_chat_id: string
  source_name?: string
  paramaters?: string[]
}
/**
 * !id: 0x0a
 * !bound: client
 */
export interface packet_set_time {
  time: zigzag32
}
/**
 * !id: 0x0b
 * !bound: client
 */
export interface packet_start_game {
  entity_id: zigzag64
  runtime_entity_id: varint64
  player_gamemode: GameMode
  player_position: vec3f
  rotation: vec2f
  seed: zigzag32
  biome_type: li16
  biome_name: string
  dimension: zigzag32
  generator: zigzag32
  world_gamemode: GameMode
  difficulty: zigzag32
  spawn_position: BlockCoordinates
  achievements_disabled: bool
  day_cycle_stop_time: zigzag32
  edu_offer: zigzag32
  edu_features_enabled: bool
  edu_product_uuid: string
  rain_level: lf32
  lightning_level: lf32
  has_confirmed_platform_locked_content: bool
  is_multiplayer: bool
  broadcast_to_lan: bool
  xbox_live_broadcast_mode: varint
  platform_broadcast_mode: varint
  enable_commands: bool
  is_texturepacks_required: bool
  gamerules: GameRules
  experiments: Experiments
  experiments_previously_used: bool
  bonus_chest: bool
  map_enabled: bool
  permission_level: zigzag32
  server_chunk_tick_range: li32
  has_locked_behavior_pack: bool
  has_locked_resource_pack: bool
  is_from_locked_world_template: bool
  msa_gamertags_only: bool
  is_from_world_template: bool
  is_world_template_option_locked: bool
  only_spawn_v1_villagers: bool
  game_version: string
  limited_world_width: li32
  limited_world_length: li32
  is_new_nether: bool
  experimental_gameplay_override: bool
  level_id: string
  world_name: string
  premium_world_template_id: string
  is_trial: bool
  movement_authority: StartGameMovementAuth
  rewind_history_size: zigzag32
  server_authoritative_block_breaking: bool
  current_tick: li64
  enchantment_seed: zigzag32
  block_properties: BlockProperties
  itemstates: Itemstates
  multiplayer_correlation_id: string
  server_authoritative_inventory: bool
  engine: string
}
/**
 * !id: 0x0c
 * !bound: client
 */
export interface packet_add_player {
  uuid: uuid
  username: string
  entity_id_self: zigzag64
  runtime_entity_id: varint64
  platform_chat_id: string
   position: vec3f
   velocity: vec3f
   pitch: lf32
   yaw: lf32
   head_yaw: lf32
   held_item: Item
   metadata: MetadataDictionary
   flags: varint
   command_permission: varint
   action_permissions: varint
   permission_level: varint
   custom_stored_permissions: varint
   user_id: li64
   links: Links
   device_id: string
   device_os: li32
}
/**
 * !id: 0x0d
 * !bound: client
 */
export interface packet_add_entity {
  entity_id_self: zigzag64
  runtime_entity_id: varint64
  entity_type: string
  position: vec3f
  velocity: vec3f
  pitch: lf32
  yaw: lf32
  head_yaw: lf32
  attributes: EntityAttributes
  metadata: MetadataDictionary
  links: Links
}
/**
 * !id: 0x0e
 * !bound: client
 */
export interface packet_remove_entity {
  entity_id_self: zigzag64
}
/**
 * !id: 0x0f
 * !bound: client
 */
export interface packet_add_item_entity {
  entity_id_self: zigzag64
  runtime_entity_id: varint64
  item: Item
  position: vec3f
  velocity: vec3f
  metadata: MetadataDictionary
  is_from_fishing: bool
}
/**
 * !id: 0x11
 * !bound: client
 */
export interface packet_take_item_entity {
  runtime_entity_id: varint64
   target: varint
}
/**
 * !id: 0x12
 * !bound: both
 */
export interface packet_move_entity {
  runtime_entity_id: varint64
  flags: u8
  position: vec3f
  rotation: Rotation
}
/**
 * !id: 0x13
 * !bound: both
 */
export interface packet_move_player {
  runtime_id?: varint
  position: vec3f
  pitch: lf32
  yaw: lf32
  head_yaw: lf32
  mode: MovePlayerMode
  on_ground: bool
  ridden_runtime_id: varint
  teleport?: MovePlayerTeleport
  tick: varint64
}
/**
 * !id: 0x14
 * !bound: both
 */
export interface packet_rider_jump {
  jump_strength: zigzag32
}
/**
 * !id: 0x15
 * !bound: client
 */
export interface packet_update_block {
  position: BlockCoordinates
  block_runtime_id: varint
  flags: UpdateBlockFlags[]
  layer: varint
}
/**
 * !id: 0x16
 * !bound: client
 */
export interface packet_add_painting {
  entity_id_self: zigzag64
  runtime_entity_id: varint64
  coordinates: vec3f
  direction: zigzag32
  title: string
}
/**
 * !id: 0x17
 * !bound: both
 */
export interface packet_tick_sync {
  request_time: li64
  response_time: li64
}
/**
 * !id: 0x18
 * !bound: both
 */
export interface packet_level_sound_event_old {
  sound_id: u8
  position: vec3f
  block_id: zigzag32
  entity_type: zigzag32
  is_baby_mob: bool
  is_global: bool
}
/**
 * !id: 0x19
 * !bound: client
 */
export interface packet_level_event {
  event: LevelEventEvent
  position: vec3f
  data: zigzag32
}
/**
 * !id: 0x1a
 * !bound: client
 */
export interface packet_block_event {
  position: BlockCoordinates
  type: BlockEventType
  data: zigzag32
}
/**
 * !id: 0x1b
 * !bound: both
 */
export interface packet_entity_event {
  runtime_entity_id: varint64
  event_id: EntityEventEventId
  data: zigzag32
}
/**
 * !id: 0x1c
 * !bound: client
 */
export interface packet_mob_effect {
  runtime_entity_id: varint64
  event_id: u8
  effect_id: zigzag32
  amplifier: zigzag32
  particles: bool
  duration: zigzag32
}
/**
 * !id: 0x1d
 * !bound: client
 */
export interface packet_update_attributes {
  runtime_entity_id: varint64
  attributes: PlayerAttributes
  tick: varint64
}
/**
 * !id: 0x1e
 * !bound: both
 */
export interface packet_inventory_transaction {
  transaction: Transaction
}
/**
 * !id: 0x1f
 * !bound: both
 */
export interface packet_mob_equipment {
  runtime_entity_id: varint64
  item: Item
  slot: u8
  selected_slot: u8
  window_id: WindowID
}
/**
 * !id: 0x20
 * !bound: both
 */
export interface packet_mob_armor_equipment {
  runtime_entity_id: varint64
  helmet: Item
  chestplate: Item
  leggings: Item
  boots: Item
}
/**
 * !id: 0x21
 * !bound: both
 */
export interface packet_interact {
  action_id: InteractActionId
  target_entity_id: varint64
  position?: vec3f
}
/**
 * !id: 0x22
 * !bound: server
 */
export interface packet_block_pick_request {
  x: zigzag32
  y: zigzag32
  z: zigzag32
  add_user_data: bool
  selected_slot: u8
}
/**
 * !id: 0x23
 * !bound: server
 */
export interface packet_entity_pick_request {
  runtime_entity_id: lu64
  selected_slot: u8
}
/**
 * !id: 0x24
 * !bound: server
 */
export interface packet_player_action {
  runtime_entity_id: varint64
  action: Action
  position: BlockCoordinates
  face: zigzag32
}
/**
 * !id: 0x26
 * !bound: client
 */
export interface packet_hurt_armor {
  health: zigzag32
}
/**
 * !id: 0x27
 * !bound: both
 */
export interface packet_set_entity_data {
  runtime_entity_id: varint64
  metadata: MetadataDictionary
  tick: varint
}
/**
 * !id: 0x28
 * !bound: both
 */
export interface packet_set_entity_motion {
  runtime_entity_id: varint64
  velocity: vec3f
}
/**
 * !id: 0x29
 * !bound: client
 */
export interface packet_set_entity_link {
  link: Link
}
/**
 * !id: 0x2a
 * !bound: client
 */
export interface packet_set_health {
  health: zigzag32
}
/**
 * !id: 0x2b
 * !bound: client
 */
export interface packet_set_spawn_position {
  spawn_type: SetSpawnPositionType
  player_position: BlockCoordinates
  dimension: zigzag32
  world_position: BlockCoordinates
}
/**
 * !id: 0x2c
 * !bound: both
 */
export interface packet_animate {
  action_id: AnimateActionId
}
/**
 * !id: 0x2d
 * !bound: both
 */
export interface packet_respawn {
  position: vec3f
  state: u8
  runtime_entity_id: varint64
}
/**
 * !id: 0x2e
 * !bound: client
 */
export interface packet_container_open {
  window_id: WindowID
  window_type: WindowType
  coordinates: BlockCoordinates
  runtime_entity_id: zigzag64
}
/**
 * !id: 0x2f
 * !bound: both
 */
export interface packet_container_close {
  window_id: WindowID
  server: bool
}
/**
 * !id: 0x30
 * !bound: both
 */
export interface packet_player_hotbar {
  selected_slot: varint
  window_id: WindowID
  select_slot: bool
}
/**
 * !id: 0x31
 * !bound: both
 */
export interface packet_inventory_content {
  window_id: WindowIDVarint
  input: ItemStacks
}
/**
 * !id: 0x32
 * !bound: both
 */
export interface packet_inventory_slot {
  window_id: WindowIDVarint
  slot: varint
  item: Item
}
/**
 * !id: 0x33
 * !bound: client
 */
export interface packet_container_set_data {
  window_id: WindowID
  property: zigzag32
  value: zigzag32
}
/**
 * !id: 0x34
 * !bound: client
 */
export interface packet_crafting_data {
  recipes: Recipes
  potion_type_recipes: PotionTypeRecipes
  potion_container_recipes: PotionContainerChangeRecipes
  is_clean: bool
}
/**
 * !id: 0x35
 * !bound: both
 */
export interface packet_crafting_event {
  window_id: WindowID
  recipe_type:CraftingEventRecipeType
  recipe_id: uuid
  input: Item[]
  result: Item[]
}
/**
 * !id: 0x36
 * !bound: client
 */
export interface packet_gui_data_pick_item {
  item_name: string
  item_effects: string
  hotbar_slot: li32
}
/**
 * !id: 0x37
 * !bound: both
 */
export interface packet_adventure_settings {
  flags: AdventureFlags
  command_permission: AdventureCommandPermission
  action_permissions: ActionPermissions
  permission_level: AdventurePermission
  custom_stored_permissions: varint
  user_id: li64
}
/**
 * !id: 0x38
 * !bound: both
 */
export interface packet_block_entity_data {
  position: BlockCoordinates
  nbt: nbt
}
/**
 * !id: 0x39
 * !bound: server
 */
export interface packet_player_input {
  motion_x: lf32
  motion_z: lf32
  jumping: bool
  sneaking: bool
}
/**
 * !id: 0x3a
 * !bound: client
 */
export interface packet_level_chunk {
  x: zigzag32
  z: zigzag32
  sub_chunk_count: varint
  cache_enabled: bool
  blobs?: lu64[]
  payload: ByteArray
}
/**
 * !id: 0x3b
 * !bound: client
 */
export interface packet_set_commands_enabled {
  enabled: bool
}
/**
 * !id: 0x3c
 * !bound: client
 */
export interface packet_set_difficulty {
  difficulty: varint
}
/**
 * !id: 0x3d
 * !bound: client
 */
export interface packet_change_dimension {
  dimension: zigzag32
  position: vec3f
  respawn: bool
}
/**
 * !id: 0x3e
 * !bound: both
 */
export interface packet_set_player_game_type {
  gamemode: GameMode
}
/**
 * !id: 0x3f
 * !bound: client
 */
export interface packet_player_list {
  records: PlayerRecords
}
/**
 * !id: 0x40
 * !bound: client
 */
export interface packet_simple_event {
  records: PlayerRecords
}
/**
 * !id: 0x41
 * !bound: client
 */
export interface packet_event {
  runtime_id: varint64
  event_type: EventType
  use_player_id: u8
  event_data: unknown
}
/**
 * !id: 0x42
 * !bound: client
 */
export interface packet_spawn_experience_orb {
  position: vec3f
  count: zigzag32
}
/**
 * !id: 0x43
 * !bound: client
 */
export interface packet_clientbound_map_item_data {
  map_id: zigzag64
  update_flags: UpdateMapFlags
  dimension: u8
  locked: bool
  included_in?: zigzag64[]
  scale?: u8
  tracked?: ClientBoundMapItemDataTracked
  texture?: ClientBoundMapItemDataTexture
}
/**
 * !id: 0x44
 * !bound: both
 */
export interface packet_map_info_request {
  map_id: zigzag64
}
/**
 * !id: 0x45
 * !bound: both
 */
export interface packet_request_chunk_radius {
  chunk_radius: zigzag32
}
/**
 * !id: 0x46
 * !bound: client
 */
export interface packet_chunk_radius_update {
  chunk_radius: zigzag32
}
/**
 * !id: 0x47
 * !bound: both
 */
export interface packet_item_frame_drop_item {
  coordinates: BlockCoordinates
}
/**
 * !id: 0x48
 * !bound: client
 */
export interface packet_game_rules_changed {
  rules: GameRules
}
/**
 * !id: 0x49
 * !bound: client
 */
export interface packet_camera {
  camera_entity_unique_id: zigzag64
  target_player_unique_id: zigzag64
}
/**
 * !id: 0x4a
 * !bound: both
 */
export interface packet_boss_event {
  boss_entity_id: zigzag64
  type: BossEventType
  title?: string
  progress?: lf32
  screen_darkening?: li16
  color?: varint
  overlay?: varint
  player_id?: zigzag64
}
/**
 * !id: 0x4b
 * !bound: client
 */
export interface packet_show_credits {
  runtime_entity_id: varint64
  status: zigzag32
}
/**
 * !id: 0x4c
 * !bound: client
 */
export interface packet_available_commands {
  values_len: varint
  _enum_type: string
  enum_values: string[]
  suffixes: string[]
  enums: AvailableCommandsEnum[]
  command_data: AvailableCommandsData[]
  dynamic_enums: DynamicEnum[]
  enum_constraints: EnumConstraint[]
}
/**
 * !id: 0x4d
 * !bound: server
 */
export interface packet_command_request {
  command: string
  origin: CommandOrigin
  interval: bool
}
/**
 * !id: 0x4e
 * !bound: server
 */
export interface packet_command_block_update {
  is_block: bool
  minecart_entity_runtime_id?: varint64
  position?: BlockCoordinates
  mode?: CommandBlockUpdateMode
  needs_redstone?: bool
  conditional?: bool
  command: string
  last_output: string
  name: string
  should_track_output: bool
  tick_delay: li32
  execute_on_first_tick: bool
}
/**
 * !id: 0x4f
 * !bound: client
 */
export interface packet_command_output {
  origin: CommandOrigin
  output_type: CommandOutputType
  success_count: varint
  output: CommandOutputOutput[]
  data_set?: string
}
/**
 * !id: 0x50
 * !bound: client
 */
export interface packet_update_trade {
  window_id: WindowID
  window_type: WindowType
  size: varint
  trade_tier: varint
  villager_unique_id: varint64
  entity_unique_id: varint64
  display_name: string
  new_trading_ui: bool
  economic_trades: bool
  offers: nbt
}
/**
 * !id: 0x51
 * !bound: client
 */
export interface packet_update_equipment {
  window_id: WindowID
  window_type: WindowType
  size: u8
  entity_id: zigzag64
  inventory: nbt
}
/**
 * !id: 0x52
 * !bound: client
 */
export interface packet_resource_pack_data_info {
  pack_id: string
  max_chunk_size: lu32
  chunk_count: lu32
  size: lu64
  hash: ByteArray
  is_premium: bool
  pack_type: ResourcePackDataType
}
/**
 * !id: 0x53
 * !bound: client
 */
export interface packet_resource_pack_chunk_data {
  pack_id: string
  chunk_index: lu32
  progress: lu64
  payload: ByteArray
}
/**
 * !id: 0x54
 * !bound: server
 */
export interface packet_resource_pack_chunk_request {
  pack_id: string
  chunk_index: lu32
}
/**
 * !id: 0x55
 * !bound: client
 */
export interface packet_transfer {
  server_address: string
  port: lu16
}
/**
 * !id: 0x56
 * !bound: client
 */
export interface packet_play_sound {
  name: string
  coordinates: BlockCoordinates
  volume: lf32
  pitch: lf32
}
/**
 * !id: 0x57
 * !bound: client
 */
export interface packet_stop_sound {
  name: string
  stop_all: bool
}
/**
 * !id: 0x58
 * !bound: client
 */
export interface packet_set_title {
  type: SetTitleType
  text: string
  fade_in_time: zigzag32
  stay_time: zigzag32
  fade_out_time: zigzag32
  xuid: string
  platform_online_id: string
}
/**
 * !id: 0x59
 * !bound: client
 */
export interface packet_add_behavior_tree {
  behaviortree: string
}
/**
 * !id: 0x5a
 * !bound: client
 */
export interface packet_structure_block_update {
  position: BlockCoordinates
  structure_name: string
  data_field: string
  include_players: bool
  show_bounding_box: bool
  structure_block_type: zigzag32
  settings: StructureBlockSettings
  redstone_save_mode: zigzag32
  should_trigger: bool
}
/**
 * !id: 0x5b
 * !bound: client
 */
export interface packet_show_store_offer {
  offer_id: string
  show_all: bool
}
/**
 * !id: 0x5c
 * !bound: server
 */
export interface packet_purchase_receipt {
  receipts: string[]
}
/**
 * !id: 0x5d
 * !bound: both
 */
export interface packet_player_skin {
  uuid: uuid
  skin: Skin
  skin_name: string
  old_skin_name: string
  is_verified: bool
}
/**
 * !id: 0x5e
 * !bound: client
 */
export interface packet_sub_client_login {
  tokens: LoginTokens
}
/**
 * !id: 0x5f
 * !bound: client
 */
export interface packet_initiate_web_socket_connection {
  server: string
}
/**
 * !id: 0x60
 * !bound: client
 */
export interface packet_set_last_hurt_by {
  entity_type: varint
}
/**
 * !id: 0x61
 * !bound: server
 */
export interface packet_book_edit {
  type: BookEditType
  slot: u8
  page_number?: u8
  text?: string
  photo_name?: string
  page1?: u8
  page2?: u8
  title?: string
  author?: string
  xuid?: string
}
/**
 * !id: 0x62
 * !bound: both
 */
export interface packet_npc_request {
  runtime_entity_id: varint64
  request_type: NPCRequestType
  command: string
  action_type: NPCRequestActionType
  scene_name: string
}
/**
 * !id: 0x63
 * !bound: server
 */
export interface packet_photo_transfer {
  image_name: string
  image_data: string
  book_id: string
}
/**
 * !id: 0x64
 * !bound: client
 */
export interface packet_modal_form_request {
  form_id: varint
  data: string
}
/**
 * !id: 0x65
 * !bound: server
 */
export interface packet_modal_form_response {
  form_id: varint
  data: string
}
/**
 * !id: 0x66
 * !bound: server
 */
export interface packet_server_settings_request {}
/**
 * !id: 0x67
 * !bound: client
 */
export interface packet_server_settings_response {
  form_id: varint
  data: string
}
/**
 * !id: 0x68
 * !bound: client
 */
export interface packet_show_profile {
  xuid: string
}
/**
 * !id: 0x69
 * !bound: client
 */
export interface packet_set_default_game_type {
  gamemode: GameMode
}
/**
 * !id: 0x6a
 * !bound: client
 */
export interface packet_remove_objective {
  objective_name: string
}
/**
 * !id: 0x6b
 * !bound: client
 */
export interface packet_set_display_objective {
  display_slot: string
  objective_name: string
  display_name: string
  criteria_name: string
  sort_order: zigzag32
}
/**
 * !id: 0x6c
 * !bound: client
 */
export interface packet_set_score {
  action: SetScoreAction
  entries: ScoreEntry[]
}
/**
 * !id: 0x6d
 * !bound: both
 */
export interface packet_lab_table {
  action_type: LabTableAction
  position: vec3u
  reaction_type: u8
}
/**
 * !id: 0x6e
 * !bound: client
 */
export interface packet_update_block_synced {
  position: BlockCoordinates
  block_runtime_id: varint
  flags: UpdateBlockFlags
  layer: varint
  entity_unique_id: zigzag64
  transition_type: UpdateBlockSyncType
}
/**
 * !id: 0x6f
 * !bound: client
 */
export interface packet_move_entity_delta {
  runtime_entity_id: varint64
  flags: DeltaMoveFlags
  x?: lf32
  y?: lf32
  z?: lf32
  rot_x?: u8
  rot_y?: u8
  rot_z?: u8
}
/**
 * !id: 0x70
 * !bound: client
 */
export interface packet_set_scoreboard_identity {
  action: ScoreboardIdentityAction
  entries: ScoreboardIdentityEntry[]
}
/**
 * !id: 0x71
 * !bound: server
 */
export interface packet_set_local_player_as_initialized {
  runtime_entity_id: varint64
}
/**
 * !id: 0x72
 * !bound: client
 */
export interface packet_update_soft_enum {}
/**
 * !id: 0x73
 * !bound: both
 */
export interface packet_network_stack_latency {
  timestamp: lu64
  needs_response: u8
}
/**
 * !id: 0x75
 * !bound: both
 */
export interface packet_script_custom_event {
  event_name: string
  event_data: string
}
/**
 * !id: 0x76
 * !bound: client
 */
export interface packet_spawn_particle_effect {
  dimension: u8
  entity_id: zigzag64
  position: vec3f
  particle_name: string
}
/**
 * !id: 0x77
 * !bound: client
 */
export interface packet_available_entity_identifiers {
  nbt: nbt
}
/**
 * !id: 0x78
 * !bound: both
 */
export interface packet_level_sound_event_v2 {
  sound_id: u8
  position: vec3f
  block_id: zigzag32
  entity_type: string
  is_baby_mob: bool
  is_global: bool
}
/**
 * !id: 0x79
 * !bound: client
 */
export interface packet_network_chunk_publisher_update {
  coordinates: BlockCoordinates
  radius: varint
}
/**
 * !id: 0x7a
 * !bound: client
 */
export interface packet_biome_definition_list {
  nbt: nbt
}
/**
 * !id: 0x7b
 * !bound: both
 */
export interface packet_level_sound_event {
  sound_id: SoundType
  position: vec3f
  extra_data: zigzag32
  entity_type: string
  is_baby_mob: bool
  is_global: bool
}
/**
 * !id: 0x7c
 * !bound: client
 */
export interface packet_level_event_generic {
  event_id: varint
  nbt: nbtLoop
}
/**
 * !id: 0x7d
 * !bound: client
 */
export interface packet_lectern_update {
  page: u8
  page_count: u8
  position: vec3i
  drop_book: bool
}
/**
 * !id: 0x7e
 * !bound: client
 */
export interface packet_video_stream_connect {
  server_uri: string
  frame_send_frequency: lf32
  action: u8
  resolution_x: li32
  resolution_y: li32
}
/**
 * !id: 0x7f
 * !bound: client
 */
export interface packet_add_ecs_entity {
  network_id: varint64
}
/**
 * !id: 0x80
 * !bound: client
 */
export interface packet_remove_ecs_entity {
  network_id: varint64
}
/**
 * !id: 0x81
 * !bound: both
 */
export interface packet_client_cache_status {
  network_id?: varint64
  enabled: bool
}
/**
 * !id: 0x82
 * !bound: client
 */
export interface packet_on_screen_texture_animation {
  animation_type: lu32
}
/**
 * !id: 0x83
 * !bound: client
 */
export interface packet_map_create_locked_copy {
  original_map_id: zigzag64
  new_map_id: zigzag64
}
/**
 * !id: 0x84
 * !bound: client
 */
export interface packet_structure_template_data_export_request {
  name: string
  position: BlockCoordinates
  settings: StructureBlockSettings
  request_type: StructureTemplateData
}
/**
 * !id: 0x85
 * !bound: client
 */
export interface packet_structure_template_data_export_response {
  name: string
  success: bool
  nbt?: nbt
  response_type: StructureTemplateType
}
/**
 * !id: 0x86
 * !bound: client
 */
export interface packet_update_block_properties {
  nbt: nbt
}
/**
 * !id: 0x87
 * !bound: client
 */
export interface packet_client_cache_blob_status {
  misses: varint
  haves: varint
  missing: lu64[]
  have: lu64[]
}
/**
 * !id: 0x88
 * !bound: client
 */
export interface packet_client_cache_miss_response {
  blobs: Blob[]
}
/**
 * !id: 0x89
 * !bound: client
 */
export interface packet_education_settings {
  CodeBuilderDefaultURI: string
  CodeBuilderTitle: string
  CanResizeCodeBuilder: bool
  HasOverrideURI: bool
  OverrideURI?: string
  HasQuiz: bool
}
/**
 * !id: 0x8b
 * !bound: server
 */
export interface packet_multiplayer_settings {
  action_type: MultiplayerSettingsType
}
/**
 * !id: 0x8c
 * !bound: server
 */
export interface packet_settings_command {
  command_line: string
  suppress_output: bool
}
/**
 * !id: 0x8d
 * !bound: server
 */
export interface packet_anvil_damage {
  damage: u8
  position: BlockCoordinates
}
/**
 * !id: 0x8e
 * !bound: client
 */
export interface packet_completed_using_item {
  used_item_id: li16
  use_method: CompletedUsingItemMethod
}
/**
 * !id: 0x8f
 * !bound: both
 */
export interface packet_network_settings {
  compression_threshold: u16
}
/**
 * !id: 0x90
 * !bound: server
 */
export interface packet_player_auth_input {
  pitch: lf32
  yaw: lf32
  position: vec3f
  move_vector: vec2f
  head_yaw: lf32
  input_data: InputFlag
  input_mode: PlayerAuthInputMode
  play_mode: PlayerAuthInputMode
  gaze_direction?: vec3f
  tick: varint64
  delta: vec3f
  transaction?: PlayerAuthInputTransaction
  item_stack_request?: ItemStackRequest
  block_action?: PlayerAuthInputBlockAction
}
/**
 * !id: 0x91
 * !bound: client
 */
export interface packet_creative_content {
  items: CreativeContentItem[]
}
/**
 * !id: 0x92
 * !bound: client
 */
export interface packet_player_enchant_options {
  options: EnchantOption[]
}
/**
 * !id: 0x93
 * !bound: server
 */
export interface packet_item_stack_request {
  requests: ItemStackRequest[]
}
/**
 * !id: 0x94
 * !bound: client
 */
export interface packet_item_stack_response {
  responses: ItemStackResponses
}
/**
 * !id: 0x95
 * !bound: client
 */
export interface packet_player_armor_damage {
  responses: ItemStackResponses
  type: ArmorDamageType
  helmet_damage?: zigzag32
  chestplate_damage?: zigzag32
  leggings_damage?: zigzag32
  boots_damage?: zigzag32
}
/**
 * !id: 0x97
 * !bound: server
 */
export interface packet_update_player_game_type {
  gamemode: GameMode
  player_unique_id: zigzag64
}
/**
 * !id: 0x9a
 * !bound: server
 */
export interface packet_position_tracking_db_request {
  gamemode: GameMode
  player_unique_id: zigzag64
  action: 'query'
  tracking_id: zigzag32
}
/**
 * !id: 0x99
 * !bound: client
 */
export interface packet_position_tracking_db_broadcast {
  broadcast_action: PositionTrackingAction
  tracking_id: zigzag32
  nbt: nbt
}
/**
 * !id: 0x9c
 * !bound: server
 */
export interface packet_packet_violation_warning {
  violation_type: 'malformed'
  severity: PacketViolationSeverity
  packet_id: zigzag32
  reason: string
}
/**
 * !id: 0x9d
 * !bound: client
 */
export interface packet_motion_prediction_hints {
  entity_runtime_id: varint64
  velocity: vec3f
  on_ground: bool
}
/**
 * !id: 0x9e
 * !bound: client
 */
export interface packet_animate_entity {
  animation: string
  next_state: string
  stop_condition: string
  controller: string
  blend_out_time: lf32
  runtime_entity_ids: varint64[]
}
/**
 * !id: 0x9f
 * !bound: client
 */
export interface packet_camera_shake {
  intensity: lf32
  duration: lf32
  type: u8
  action: CameraShakeAction
}
/**
 * !id: 0xa0
 * !bound: client
 */
export interface packet_player_fog {
  stack: string[]
}
/**
 * !id: 0xa1
 * !bound: client
 */
export interface packet_correct_player_move_prediction {
  position: vec3f
  delta: vec3f
  on_ground: bool
  tick: varint64
}
/**
 * !id: 0xa2
 * !bound: client
 */
export interface packet_item_component {
  entries: ItemComponentList
}
/**
 * !id: 0xa3
 * !bound: both
 */
export interface packet_filter_text_packet {
  text: string
  from_server: bool
}
/**
 * !id: 0xa4
 * !bound: client
 */
export interface packet_debug_renderer {
  type: DebugRendererType
  text: string
  position?: vec3f
  red?: lf32
  green?: lf32
  blue?: lf32
  alpha?: lf32
  duration?: li64
}
/**
 * !id: 0xa5
 * !bound: client
 */
export interface packet_sync_entity_property {
  nbt: nbt
}
/**
 * !id: 0xa6
 * !bound: client
 */
export interface packet_add_volume_entity {
  entity_id: varint64
  nbt: nbt
}
/**
 * !id: 0xa7
 * !bound: client
 */
export interface packet_remove_volume_entity {
  entity_id: varint64
}
/**
 * !id: 0xa8
 * !bound: client
 */
export interface packet_simulation_type {
  type: SimulationTypeType
}
/**
 * !id: 0xa9
 * !bound: client
 */
export interface packet_npc_dialogue {
  entity_id: lu64
  action_type: NPCDialogueType
  dialogue: string
  screen_name: string
  npc_name: string
  action_json: string
}
