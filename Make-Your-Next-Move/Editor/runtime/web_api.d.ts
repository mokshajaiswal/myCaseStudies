/* tslint:disable */
/* eslint-disable */

/**
 * A restricted binding over the shared in-memory editor and player.
 */
export class TesseractEngine {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    applyAction(action: any): { document: any; historyDepth: { undo: number; redo: number } };
    applyBatch(actions: any): { document: any; historyDepth: { undo: number; redo: number } };
    audioClockMs(): number | undefined;
    beginEditGroup(label?: string | null): string;
    cancelEditGroup(group_id: string): { document: any; historyDepth: { undo: number; redo: number } };
    commitEditGroup(group_id: string): { document: any; historyDepth: { undo: number; redo: number } };
    /**
     * Preview only: no Studio pointer listeners or selection overlays.
     */
    connectCanvas(canvas: HTMLCanvasElement): Promise<any>;
    static create(file: Blob): Promise<TesseractEngine>;
    dispose(): void;
    /**
     * Lossless editable document for inspection and property controls.
     */
    document(): any;
    /**
     * Evaluated 2D selection geometry in project pixels, bottom-to-top.
     * Call after renderFrame so font/media measurements match the preview.
     */
    layerBounds(time_ms: number): { complete: boolean; layers: { layerId: string; points: [number, number][]; parentTransform: [number, number, number, number, number, number]; hitTestable: boolean }[] };
    loadResources(): Promise<any>;
    preloadAudio(): void;
    pumpAudioScheduler(): void;
    redo(): { document: any; historyDepth: { undo: number; redo: number } };
    /**
     * Await asynchronous decodes before presenting a scrubbed frame.
     */
    renderFrame(time_ms: number): Promise<any>;
    setMuted(muted: boolean): void;
    startPlayback(time_ms: number): void;
    stopPlayback(): void;
    /**
     * Capture the current project immediately, then package its assets asynchronously.
     */
    toBlob(): Promise<Blob>;
    undo(): { document: any; historyDepth: { undo: number; redo: number } };
}

export function actionSchema(): any;

export function engineVersion(): string;

export function version(): string;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly __wbg_tesseractengine_free: (a: number, b: number) => void;
    readonly actionSchema: () => [number, number, number];
    readonly engineVersion: () => [number, number];
    readonly tesseractengine_applyAction: (a: number, b: any) => [number, number, number];
    readonly tesseractengine_applyBatch: (a: number, b: any) => [number, number, number];
    readonly tesseractengine_audioClockMs: (a: number) => [number, number];
    readonly tesseractengine_beginEditGroup: (a: number, b: number, c: number) => [number, number, number, number];
    readonly tesseractengine_cancelEditGroup: (a: number, b: number, c: number) => [number, number, number];
    readonly tesseractengine_commitEditGroup: (a: number, b: number, c: number) => [number, number, number];
    readonly tesseractengine_connectCanvas: (a: number, b: any) => any;
    readonly tesseractengine_create: (a: any) => any;
    readonly tesseractengine_dispose: (a: number) => void;
    readonly tesseractengine_document: (a: number) => [number, number, number];
    readonly tesseractengine_layerBounds: (a: number, b: number) => [number, number, number];
    readonly tesseractengine_loadResources: (a: number) => any;
    readonly tesseractengine_preloadAudio: (a: number) => void;
    readonly tesseractengine_pumpAudioScheduler: (a: number) => void;
    readonly tesseractengine_redo: (a: number) => [number, number, number];
    readonly tesseractengine_renderFrame: (a: number, b: number) => [number, number, number];
    readonly tesseractengine_setMuted: (a: number, b: number) => void;
    readonly tesseractengine_startPlayback: (a: number, b: number) => [number, number];
    readonly tesseractengine_stopPlayback: (a: number) => void;
    readonly tesseractengine_toBlob: (a: number) => [number, number, number];
    readonly tesseractengine_undo: (a: number) => [number, number, number];
    readonly version: () => [number, number];
    readonly wasm_bindgen__convert__closures_____invoke__hef4fac82b0e4ac33: (a: number, b: number, c: any) => [number, number];
    readonly wasm_bindgen__convert__closures_____invoke__h86dbcf65592dd6c0: (a: number, b: number, c: any) => [number, number];
    readonly wasm_bindgen__convert__closures_____invoke__h86dbcf65592dd6c0_5: (a: number, b: number, c: any) => [number, number];
    readonly wasm_bindgen__convert__closures_____invoke__h921615c6b71e3686: (a: number, b: number, c: any) => [number, number];
    readonly wasm_bindgen__convert__closures_____invoke__h27642f52cfd45577: (a: number, b: number, c: any, d: any) => void;
    readonly wasm_bindgen__convert__closures_____invoke__h0607ec4f94b2e9fc: (a: number, b: number, c: any) => void;
    readonly wasm_bindgen__convert__closures_____invoke__h9edf9ca72c7be2b3: (a: number, b: number, c: any) => void;
    readonly wasm_bindgen__convert__closures_____invoke__h0607ec4f94b2e9fc_4: (a: number, b: number, c: any) => void;
    readonly wasm_bindgen__convert__closures_____invoke__h4c4c3de5e4ef96f2: (a: number, b: number, c: any) => void;
    readonly wasm_bindgen__convert__closures_____invoke__h8ae79ceefda28a64: (a: number, b: number) => void;
    readonly __wbindgen_malloc: (a: number, b: number) => number;
    readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
    readonly __wbindgen_exn_store: (a: number) => void;
    readonly __externref_table_alloc: () => number;
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __wbindgen_destroy_closure: (a: number, b: number) => void;
    readonly __externref_table_dealloc: (a: number) => void;
    readonly __wbindgen_free: (a: number, b: number, c: number) => void;
    readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
