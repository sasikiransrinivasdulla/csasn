/* chapters.js — CSA Study Data */
const CHAPTERS = [

{
  id:'ch-01', number:'01',
  title:'Service Catalog',
  tags:['Catalog','Request','RITM'],
  content:`
<p class="chapter-intro">Service Catalog = Amazon of ServiceNow 🛒 — Users order items, approvals happen, tasks get created.</p>
<h3>Core Concepts</h3>
<ul>
  <li><strong>Catalog Item</strong> — Single orderable item (e.g., Laptop Request). Creates a <span class="kw">RITM</span> (Requested Item).</li>
  <li><strong>Record Producer</strong> — Looks like a catalog item but creates any table record (e.g., Incident, Problem). <em>Not an RITM.</em></li>
  <li><strong>Order Guide</strong> — Bundle of catalog items ordered together. One <span class="kw">REQ</span>, many <span class="kw">RITMs</span>.</li>
  <li><strong>REQ</strong> — Request (parent). <strong>RITM</strong> — Requested Item (child). <strong>Task</strong> — Sub-task of RITM.</li>
  <li><strong>Category</strong> — Groups items inside a catalog. <strong>Catalog</strong> — Top-level container.</li>
  <li><strong>Variable</strong> — Input fields on the catalog form (text, checkbox, reference, etc.).</li>
  <li><strong>Variable Set</strong> — Reusable group of variables. Add once, use across multiple items.</li>
</ul>
<h3>Fulfillment Flow</h3>
<p>User submits → <span class="kw">REQ</span> created → <span class="kw">RITM</span> created → Approval → <span class="kw">Catalog Task</span> assigned → Fulfilled → Closed.</p>
<div class="block block--example">
  <div class="block__label"><span class="block__icon">📘</span> Example</div>
  <div class="block__body">
    <p>Order Guide: "New Employee Setup" bundles Laptop + Email + Badge. One REQ, three RITMs.</p>
    <p>Record Producer: "Report an Issue" on the catalog actually creates an <strong>Incident</strong>, not a RITM.</p>
  </div>
</div>
<div class="block block--memory">
  <div class="block__label"><span class="block__icon">💡</span> CSA Memory</div>
  <div class="block__body">
    <ul>
      <li>Catalog Item → RITM always.</li>
      <li>Record Producer → creates records on <em>any</em> table (Incident, Problem…). Not RITM.</li>
      <li>Order Guide = Bundle = Multiple RITMs under one REQ.</li>
      <li>Variable Set = Reusable variable group. Save time, avoid duplication.</li>
    </ul>
  </div>
</div>
<div class="block block--trap">
  <div class="block__label"><span class="block__icon">🚨</span> CSA Trap</div>
  <div class="block__body">
    <ul>
      <li>"Record Producer creates a RITM" — <strong>FALSE</strong>. It creates records on whichever table you configure.</li>
      <li>"Order Guide creates one RITM" — <strong>FALSE</strong>. One REQ, <em>multiple</em> RITMs.</li>
      <li>Catalog Task ≠ RITM. Task is a sub-task inside a RITM.</li>
    </ul>
  </div>
</div>`
},

{
  id:'ch-02', number:'02',
  title:'Users, Roles, Groups & User Menu',
  tags:['Users','Roles','Groups','Access'],
  content:`
<p class="chapter-intro">Access in ServiceNow flows through Roles → assigned to Users directly or via Groups. Groups are the recommended way.</p>
<h3>Users</h3>
<ul>
  <li>Stored in <span class="kw">sys_user</span> table.</li>
  <li>Each user has a unique <strong>User ID</strong>.</li>
  <li>Users can have roles assigned directly or via Groups.</li>
  <li><strong>Active</strong> flag — unchecking prevents login.</li>
</ul>
<h3>Roles</h3>
<ul>
  <li>Controls what a user <em>can do</em> (permissions, module access, form fields).</li>
  <li>Common roles: <span class="kw">admin</span>, <span class="kw">itil</span>, <span class="kw">catalog_admin</span>, <span class="kw">knowledge</span>.</li>
  <li>Roles can <strong>contain other roles</strong> (role inheritance).</li>
  <li>Stored in <span class="kw">sys_user_role</span> table.</li>
</ul>
<h3>Groups</h3>
<ul>
  <li>Collection of users. Assign roles to a group → all members inherit those roles.</li>
  <li>Used for ticket assignment (Assignment Group).</li>
  <li>Stored in <span class="kw">sys_user_group</span> table.</li>
</ul>
<h3>User Menu (Top-Right)</h3>
<ul>
  <li>Profile, Preferences, Logout, Impersonate User.</li>
  <li><strong>Impersonate User</strong> — Admin can log in as another user to test their experience. Requires <span class="kw">admin</span> role.</li>
</ul>
<div class="block block--memory">
  <div class="block__label"><span class="block__icon">💡</span> CSA Memory</div>
  <div class="block__body">
    <ul>
      <li>User → sys_user. Group → sys_user_group. Role → sys_user_role.</li>
      <li>Best practice: Assign roles to <strong>Groups</strong>, not directly to users.</li>
      <li>Impersonate = Admin test-drives another user's view. No password needed.</li>
      <li>Role inheritance: Role A contains Role B → assigning A gives B automatically.</li>
    </ul>
  </div>
</div>
<div class="block block--trap">
  <div class="block__label"><span class="block__icon">🚨</span> CSA Trap</div>
  <div class="block__body">
    <ul>
      <li>"Impersonate requires the other user's password" — <strong>FALSE</strong>. Admin only needs their own credentials.</li>
      <li>"Roles must be assigned directly to users" — <strong>FALSE</strong>. Groups are the recommended path.</li>
    </ul>
  </div>
</div>`
},

{
  id:'ch-03', number:'03',
  title:'Reports & Filters',
  tags:['Reports','Dashboards','Filters'],
  content:`
<p class="chapter-intro">Reports visualise table data. Filters define what records are included. Together = your ServiceNow analytics layer.</p>
<h3>Report Types</h3>
<ul>
  <li><strong>Bar / Pie / Donut</strong> — Counts grouped by a field.</li>
  <li><strong>List</strong> — Flat list of records matching conditions.</li>
  <li><strong>Trend</strong> — Data over time.</li>
  <li><strong>Pivot Table</strong> — Two-dimensional grouping.</li>
  <li><strong>Heat Map</strong> — Volume across two dimensions (e.g., Category vs Priority).</li>
  <li><strong>Single Score</strong> — One big number (KPI widget).</li>
</ul>
<h3>Filters & Conditions</h3>
<ul>
  <li>Condition Builder uses <strong>AND / OR</strong> logic.</li>
  <li>Filters can be saved and shared.</li>
  <li><strong>Breadcrumb filter</strong> — Click a value in a list column to filter by it instantly.</li>
  <li><strong>Context menu</strong> — Right-click a field value → filter options.</li>
</ul>
<h3>Sharing Reports</h3>
<ul>
  <li>Reports can be added to <strong>Dashboards</strong>.</li>
  <li>Shared via: Group, Role, or specific Users.</li>
  <li>Scheduled reports → emailed automatically.</li>
</ul>
<div class="block block--memory">
  <div class="block__label"><span class="block__icon">💡</span> CSA Memory</div>
  <div class="block__body">
    <ul>
      <li>Report = Visualisation of table data.</li>
      <li>Filter = Conditions that limit which records appear.</li>
      <li>Breadcrumb filter = Click to filter. Fastest way to narrow list view.</li>
      <li>Dashboard = Canvas holding multiple report widgets.</li>
    </ul>
  </div>
</div>
<div class="block block--trap">
  <div class="block__label"><span class="block__icon">🚨</span> CSA Trap</div>
  <div class="block__body">
    <ul>
      <li>"Performance Analytics is the same as Reports" — <strong>FALSE</strong>. PA requires a separate plugin and tracks metrics over time with scoring.</li>
      <li>Reports are <em>point-in-time</em>. PA stores historical snapshots.</li>
    </ul>
  </div>
</div>`
},

{
  id:'ch-04', number:'04',
  title:'Knowledge Base',
  tags:['Knowledge','Articles','KB'],
  content:`
<p class="chapter-intro">Knowledge Base = Library of articles. Users self-serve answers. Reduces repeat incidents.</p>
<h3>Core Concepts</h3>
<ul>
  <li><strong>Knowledge Base (KB)</strong> — Top-level container. Instance can have multiple KBs.</li>
  <li><strong>Article</strong> — Individual piece of content inside a KB.</li>
  <li><strong>Category</strong> — Organises articles within a KB.</li>
  <li>Article states: <strong>Draft → Review → Published → Retired</strong>.</li>
  <li>Only <strong>Published</strong> articles are visible to end users.</li>
</ul>
<h3>Roles</h3>
<ul>
  <li><span class="kw">knowledge</span> — Can create/edit articles.</li>
  <li><span class="kw">knowledge_admin</span> — Manages KBs, categories, and user access.</li>
  <li><span class="kw">knowledge_manager</span> — Manages a specific KB.</li>
</ul>
<h3>Versioning</h3>
<ul>
  <li>Articles support versioning. Old versions are retained.</li>
  <li>Retiring an article hides it without deletion.</li>
</ul>
<h3>User Criteria</h3>
<ul>
  <li>Controls <em>who can read / who can contribute</em> to a KB.</li>
  <li>Separate criteria for <strong>Can Read</strong> vs <strong>Can Contribute</strong>.</li>
</ul>
<div class="block block--memory">
  <div class="block__label"><span class="block__icon">💡</span> CSA Memory</div>
  <div class="block__body">
    <ul>
      <li>KB → Category → Article. Three-level hierarchy.</li>
      <li>Draft → Review → Published → Retired. Only Published = visible.</li>
      <li>User Criteria = who reads, who writes. Different from ACL.</li>
    </ul>
  </div>
</div>
<div class="block block--trap">
  <div class="block__label"><span class="block__icon">🚨</span> CSA Trap</div>
  <div class="block__body">
    <ul>
      <li>"Any user can see all KB articles" — <strong>FALSE</strong>. User Criteria controls access per KB.</li>
      <li>"Retiring an article deletes it" — <strong>FALSE</strong>. Retired = hidden, not deleted.</li>
    </ul>
  </div>
</div>`
},

{
  id:'ch-05', number:'05',
  title:'Import Set & Transform Map',
  tags:['Import','Transform','Data Load'],
  content:`
<p class="chapter-intro">Import Set = Staging area for external data. Transform Map = Rules to move data from staging to the real table.</p>
<h3>Import Set</h3>
<ul>
  <li>External data lands in a temporary <span class="kw">Import Set Table</span> (u_import_*).</li>
  <li>Data source: Excel, CSV, JDBC, LDAP, REST, etc.</li>
  <li>Raw data is NOT yet in production tables — it is just staged.</li>
</ul>
<h3>Transform Map</h3>
<ul>
  <li>Maps Import Set fields → Target table fields.</li>
  <li>Runs <strong>Transform Scripts</strong> for custom field logic.</li>
  <li><strong>Coalesce</strong> field — Used to match incoming records to existing records (prevent duplicates). If match found → Update. If not → Insert.</li>
</ul>
<h3>Data Source</h3>
<ul>
  <li>Defines where data comes from (file, URL, database).</li>
  <li>Can be scheduled to run automatically (recurring imports).</li>
</ul>
<div class="block block--example">
  <div class="block__label"><span class="block__icon">📘</span> Example</div>
  <div class="block__body">
    <p>HR sends a CSV of new employees every Monday. Import Set loads it to u_import_employee. Transform Map maps "emp_email" → "email" on sys_user. Coalesce on "email" prevents duplicate users.</p>
  </div>
</div>
<div class="block block--memory">
  <div class="block__label"><span class="block__icon">💡</span> CSA Memory</div>
  <div class="block__body">
    <ul>
      <li>Import Set = Staging. Transform Map = Bridge. Target Table = Destination.</li>
      <li>Coalesce = Duplicate checker. Match → Update. No match → Insert.</li>
      <li>Transform Script = Custom logic during transformation.</li>
    </ul>
  </div>
</div>
<div class="block block--trap">
  <div class="block__label"><span class="block__icon">🚨</span> CSA Trap</div>
  <div class="block__body">
    <ul>
      <li>"Import Set directly updates the target table" — <strong>FALSE</strong>. Transform Map is required to move data.</li>
      <li>"Coalesce prevents all duplicates automatically" — Only prevents duplicates on the field(s) marked as coalesce.</li>
    </ul>
  </div>
</div>`
},

{
  id:'ch-06', number:'06',
  title:'Security — ACL, High Security, User Criteria',
  tags:['ACL','Security','Access Control'],
  content:`
<p class="chapter-intro">ServiceNow security layers: ACL (table/field/record) → Roles → User Criteria (KB). Each serves a different purpose.</p>
<h3>ACL — Access Control List</h3>
<ul>
  <li>Controls access to <strong>tables</strong>, <strong>fields</strong>, and <strong>records</strong>.</li>
  <li>ACL types: <span class="kw">read</span>, <span class="kw">write</span>, <span class="kw">create</span>, <span class="kw">delete</span>.</li>
  <li>ACL can require: a <strong>Role</strong>, a <strong>Condition</strong>, and/or a <strong>Script</strong>. All three must pass.</li>
  <li>More specific ACL wins: Field-level beats table-level.</li>
  <li>Stored in <span class="kw">sys_security_acl</span> table.</li>
</ul>
<h3>ACL Processing Order</h3>
<p>ServiceNow evaluates ACLs from most specific to least specific:</p>
<ol>
  <li>Table.field (most specific)</li>
  <li>Table.none (table-level field catch-all)</li>
  <li>*.field (any table, specific field)</li>
  <li>*.none (least specific — global fallback)</li>
</ol>
<h3>High Security Plugin</h3>
<ul>
  <li>When enabled: if <strong>no ACL</strong> matches a record, access is <strong>DENIED</strong> by default.</li>
  <li>Without plugin: no matching ACL = access <strong>granted</strong>.</li>
  <li>High Security = "Deny by default" mode.</li>
</ul>
<h3>User Criteria</h3>
<ul>
  <li>Used specifically for <strong>Knowledge Base</strong> and <strong>Service Catalog</strong> access.</li>
  <li>Separate from ACL. Does not appear in sys_security_acl.</li>
  <li>Defines who can Read vs Contribute to a KB.</li>
</ul>
<div class="block block--memory">
  <div class="block__label"><span class="block__icon">💡</span> CSA Memory</div>
  <div class="block__body">
    <ul>
      <li>ACL = Gate for tables/fields/records. Role + Condition + Script → all must pass.</li>
      <li>High Security Plugin = Default DENY. No ACL = No Access.</li>
      <li>User Criteria = KB/Catalog gate. Not ACL.</li>
      <li>Most specific ACL always wins.</li>
    </ul>
  </div>
</div>
<div class="block block--trap">
  <div class="block__label"><span class="block__icon">🚨</span> CSA Trap</div>
  <div class="block__body">
    <ul>
      <li>"Admin always bypasses ACL" — TRUE for built-in admin role. But elevated-privilege roles may not.</li>
      <li>"User Criteria is the same as ACL" — <strong>FALSE</strong>. Different system, different tables, different purpose.</li>
      <li>"High Security is enabled by default" — <strong>FALSE</strong>. It is a plugin that must be activated.</li>
    </ul>
  </div>
</div>`
},

{
  id:'ch-07', number:'07',
  title:'UI Policy vs UI Action',
  tags:['UI Policy','UI Action','Client-Side'],
  content:`
<p class="chapter-intro">UI Policy = Automatic field rules on a form. UI Action = Buttons, links, context menu items that trigger logic.</p>
<h3>UI Policy</h3>
<ul>
  <li>Runs on the <strong>client side</strong> (browser).</li>
  <li>Triggered when a form <strong>loads</strong> or a field <strong>changes</strong>.</li>
  <li>Can make fields: <strong>Mandatory</strong>, <strong>Read-Only</strong>, <strong>Hidden / Visible</strong>.</li>
  <li>Can run a <strong>UI Policy Action</strong> (set field values).</li>
  <li>Uses <strong>Conditions</strong> to determine when it fires.</li>
  <li>Can also run a <strong>Script</strong> (optional, for complex logic).</li>
  <li>Reverses on condition change (if "Reverse if false" is checked).</li>
</ul>
<h3>UI Action</h3>
<ul>
  <li>Creates UI elements: <strong>Buttons</strong>, <strong>Links</strong>, <strong>Context menu items</strong>.</li>
  <li>Can run on client side, server side, or both.</li>
  <li>Uses <strong>Client Script</strong> field for browser-side JS.</li>
  <li>Uses <strong>Script</strong> field (server-side) for GlideRecord operations.</li>
  <li>Examples: "Resolve Incident" button, "Approve" link.</li>
</ul>
<div class="compare-grid">
  <div class="compare-col compare-col--a">
    <div class="compare-col__heading">UI Policy</div>
    <ul>
      <li>Client-side only</li>
      <li>Auto-fires on load/change</li>
      <li>Controls field attributes</li>
      <li>Mandatory / ReadOnly / Hidden</li>
      <li>No button created</li>
    </ul>
  </div>
  <div class="compare-col compare-col--b">
    <div class="compare-col__heading">UI Action</div>
    <ul>
      <li>Client + Server side</li>
      <li>Triggered by user click</li>
      <li>Creates buttons/links</li>
      <li>Runs scripts</li>
      <li>Can submit/modify records</li>
    </ul>
  </div>
</div>
<div class="block block--memory">
  <div class="block__label"><span class="block__icon">💡</span> CSA Memory</div>
  <div class="block__body">
    <ul>
      <li>UI Policy = Auto police. Watches fields, enforces rules silently.</li>
      <li>UI Action = Button builder. User must click it.</li>
      <li>"Mandatory, Read-Only, Hidden" → think UI Policy.</li>
      <li>"Button, Link, Context Menu" → think UI Action.</li>
    </ul>
  </div>
</div>
<div class="block block--trap">
  <div class="block__label"><span class="block__icon">🚨</span> CSA Trap</div>
  <div class="block__body">
    <ul>
      <li>"UI Policy can run server-side scripts" — <strong>FALSE</strong>. Client-side only. Use Business Rule for server.</li>
      <li>"UI Action only runs on client" — <strong>FALSE</strong>. Can run server-side scripts too.</li>
    </ul>
  </div>
</div>`
},

{
  id:'ch-08', number:'08',
  title:'Configuration Item (CI) vs CMDB',
  tags:['CMDB','CI','Asset Management'],
  content:`
<p class="chapter-intro">CMDB = Database of everything in your IT environment. CI = One record inside CMDB representing one thing (server, app, switch…).</p>
<h3>CMDB</h3>
<ul>
  <li><strong>Configuration Management Database</strong>.</li>
  <li>Stores all CIs and their relationships.</li>
  <li>Base table: <span class="kw">cmdb</span>. Most CIs extend <span class="kw">cmdb_ci</span>.</li>
  <li>Not the same as Asset Management (Assets = financial/procurement focus).</li>
</ul>
<h3>Configuration Item (CI)</h3>
<ul>
  <li>A single record in the CMDB (e.g., a specific server named PROD-WEB-01).</li>
  <li>Has <strong>attributes</strong>: name, IP, OS, owner, status.</li>
  <li>Has <strong>relationships</strong>: "Runs on", "Connects to", "Depends on".</li>
  <li>CI Classes: <span class="kw">cmdb_ci_computer</span>, <span class="kw">cmdb_ci_server</span>, <span class="kw">cmdb_ci_application</span>…</li>
</ul>
<h3>CI Relationships</h3>
<ul>
  <li>Stored in <span class="kw">cmdb_rel_ci</span> table.</li>
  <li>Relationship types: "Runs on", "Hosted on", "Depends on", "Uses".</li>
  <li>Used for impact analysis — if CI goes down, what else is affected?</li>
</ul>
<div class="block block--memory">
  <div class="block__label"><span class="block__icon">💡</span> CSA Memory</div>
  <div class="block__body">
    <ul>
      <li>CMDB = Big warehouse. CI = One item on the shelf.</li>
      <li>CI Relationships = Wiring diagram between items.</li>
      <li>Asset = "What we bought and own." CI = "What is running in IT."</li>
      <li>Impact Analysis only works if CI relationships are mapped.</li>
    </ul>
  </div>
</div>
<div class="block block--trap">
  <div class="block__label"><span class="block__icon">🚨</span> CSA Trap</div>
  <div class="block__body">
    <ul>
      <li>"CMDB and Asset Management are the same" — <strong>FALSE</strong>. CMDB = operational. Asset = financial/procurement.</li>
      <li>"All CIs must have a related Asset" — <strong>FALSE</strong>. They can exist independently.</li>
    </ul>
  </div>
</div>`
},

];
