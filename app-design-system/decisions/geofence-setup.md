# Geofence setup prototype

The source tag-added frame 436:58199 establishes Card Keys and a Configure Geofence / Setup Pixel+ Tag prompt. Figma 409:63158 Delivery Details was inspected as the related form-layout reference. This editor is a proposed flow completion, not an exact Figma screen; its comparison caption explicitly says so.

Navigation, Page header, Text field, Select, Checkbox choice, Action, Notice and Phone status bar are reused unchanged. Parent layout owns 24px content inset and 16px form gap. The noninteractive ring is an illustrative boundary, labeled with radius and explicitly without map coordinates. It is not a reusable map control. Radius options are 100/250/500/1000 metres. Location is manually entered text; the checkbox models prototype permission only. No geocoding, device location, OS permission, tracking or actual alerts are requested.

Save requires a nonempty location and checked simulated permission, persists only in sessionStorage, and displays a confirmation. The Card Keys page reads that local value and shows the location/radius with an Edit geofence link. Editor re-entry restores the values. The existing Setup Pixel+ Tag action now links to this editor.

Browser verification exercised missing-location errors, 250-metre selection, simulated permission, local save confirmation, updated Card Keys text and Edit round trip. Screenshot and reference loading were checked. Syntax and catalog validation passed with zero errors, 25 components and 29 registered screens. Flow References now has 29 available previews and one unfinished suggested new-user entry. Carousel onboarding remains excluded.
