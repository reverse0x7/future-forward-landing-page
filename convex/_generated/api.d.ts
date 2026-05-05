/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as agenda from "../agenda.js";
import type * as core_team_applications from "../core_team_applications.js";
import type * as exhibitor_applications from "../exhibitor_applications.js";
import type * as newsletter from "../newsletter.js";
import type * as partner_applications from "../partner_applications.js";
import type * as registrations from "../registrations.js";
import type * as seed from "../seed.js";
import type * as speaker_applications from "../speaker_applications.js";
import type * as speakers from "../speakers.js";
import type * as sponsor_applications from "../sponsor_applications.js";
import type * as sponsors from "../sponsors.js";
import type * as team from "../team.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  agenda: typeof agenda;
  core_team_applications: typeof core_team_applications;
  exhibitor_applications: typeof exhibitor_applications;
  newsletter: typeof newsletter;
  partner_applications: typeof partner_applications;
  registrations: typeof registrations;
  seed: typeof seed;
  speaker_applications: typeof speaker_applications;
  speakers: typeof speakers;
  sponsor_applications: typeof sponsor_applications;
  sponsors: typeof sponsors;
  team: typeof team;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
