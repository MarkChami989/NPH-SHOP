const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('🚀 NPH SHOP MySQL Server is Online & Active!');
});

// =========================================================================
// 📥 ROUTE 1: REGISTER USER (POST)
// =========================================================================
app.post('/api/register', async (req, res) => {
  const { username, password, email, number, location } = req.body;

  if (!username || !password || !email || !number || !location) {
    return res.status(400).json({ success: false, message: '⚠️ Missing parameter nodes inside transaction.' });
  }

  try {
    const conn = await pool.getConnection();

    // Check if username already exists
    const [existing] = await conn.execute(
      'SELECT id FROM users WHERE username = ?',
      [username.toLowerCase()]
    );

    if (existing.length > 0) {
      conn.release();
      return res.status(400).json({ success: false, message: '❌ This username is already registered!' });
    }

    // Generate NPH ID
    const [countRows] = await conn.execute('SELECT COUNT(*) AS total FROM users');
    const nextIndex = countRows[0].total + 1;
    const nphId = `NPH-${String(nextIndex).padStart(2, '0')}`;

    // Insert new user
    await conn.execute(
      'INSERT INTO users (nph_id, username, password, email, number, location) VALUES (?, ?, ?, ?, ?, ?)',
      [nphId, username.toLowerCase(), password, email, number, location]
    );

    conn.release();

    console.log('----------------------------------------------------');
    console.log(`📦 New user committed to MySQL: [${nphId}] ${username}`);
    console.log('----------------------------------------------------');

    res.status(201).json({
      success: true,
      message: '🎉 Data locked and synchronized inside MySQL database.',
      profile: { id: nphId, email, number, location, wishlistCount: 0 }
    });

  } catch (err) {
    console.error('❌ Register error:', err.message);
    res.status(500).json({ success: false, message: '❌ Server error during registration.' });
  }
});

// =========================================================================
// 🔒 ROUTE 2: LOGIN CHECK (POST)
// =========================================================================
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, error: '⚠️ Please enter both your username and password.' });
  }

  try {
    const conn = await pool.getConnection();

    // 1. Check eza l-username moujoud b-alb table l-users
    const [results] = await conn.execute(
      'SELECT * FROM users WHERE username = ?',
      [username.toLowerCase()]
    );

    if (results.length === 0) {
      conn.release();
      return res.status(401).json({ success: false, error: '❌ Invalid username or password!' });
    }

    const user = results[0];

    // 2. Check 3al password
    if (user.password !== password) {
      conn.release();
      return res.status(401).json({ success: false, error: '❌ Invalid username or password!' });
    }

    conn.release();

    console.log('----------------------------------------------------');
    console.log(`🔒 User authenticated safely: [${user.nph_id || 'NPH-USER'}] ${user.username}`);
    console.log('----------------------------------------------------');

    res.json({
      success: true,
      message: 'Authenticated successfully!',
      user: {
        username: user.username,
        email: user.email,
        number: user.number,
        location: user.location,
        wishlistCount: user.wishlistCount || 0,
        nph_id: user.nph_id
      }
    });

  } catch (err) {
    console.error('❌ Login error:', err.message);
    res.status(500).json({ success: false, error: '❌ Server error during authentication.' });
  }
});

// =========================================================================
// 🔍 ROUTE 3: GET USER PROFILE DATA FROM MYSQL (GET) -> 🔥 COUPLING LINK FIXED!
// =========================================================================
app.get('/api/user/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const conn = await pool.getConnection();

    // Bin-jib kel l-data dynamic m3a l-password kermel Edit state logic matches perfectly
    const [results] = await conn.execute(
      'SELECT nph_id, username, password, email, number, location, wishlistCount FROM users WHERE username = ?',
      [username.toLowerCase()]
    );

    conn.release();

    if (results.length === 0) {
      return res.status(404).json({ success: false, error: '❌ User terminal node not found.' });
    }

    res.json({
      success: true,
      user: results[0]
    });

  } catch (err) {
    console.error('❌ Fetch user error:', err.message);
    res.status(500).json({ success: false, error: '❌ Server error fetching database data.' });
  }
});

// =========================================================================
// 🔄 ROUTE 4: UPDATE PROFILE DETAILS (PUT)
// =========================================================================
app.put('/api/user/update', async (req, res) => {
  const { currentUsername, username, password, email, number, location } = req.body;

  if (!currentUsername || !username || !password || !email || !number || !location) {
    return res.status(400).json({ success: false, error: '⚠️ All terminal fields are required for database synchronization.' });
  }

  try {
    const conn = await pool.getConnection();

    if (username.toLowerCase() !== currentUsername.toLowerCase()) {
      const [existing] = await conn.execute('SELECT id FROM users WHERE username = ?', [username.toLowerCase()]);
      if (existing.length > 0) {
        conn.release();
        return res.status(400).json({ success: false, error: '❌ This new username is already taken!' });
      }
    }

    await conn.execute(
      'UPDATE users SET username = ?, password = ?, email = ?, number = ?, location = ? WHERE username = ?',
      [username.toLowerCase().trim(), password, email.trim(), number.trim(), location.trim(), currentUsername.toLowerCase()]
    );

    conn.release();
    console.log(`🔄 Database profile synchronized for user: ${username}`);

    res.json({ success: true, message: '🎉 Profile locked and synchronized inside MySQL.' });

  } catch (err) {
    console.error('❌ Update profile error:', err.message);
    res.status(500).json({ success: false, error: '❌ Server error during profile modification.' });
  }
});

// =========================================================================
// 🗑️ ROUTE 5: PURGE USER ACCOUNT FOREVER (DELETE)
// =========================================================================
app.delete('/api/user/delete/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const conn = await pool.getConnection();

    await conn.execute('DELETE FROM users WHERE username = ?', [username.toLowerCase()]);
    
    conn.release();
    console.log(`🗑️ User permanently purged from MySQL: ${username}`);

    res.json({ success: true, message: '🗑️ Profile wiped out from network repositories.' });

  } catch (err) {
    console.error('❌ Purge error:', err.message);
    res.status(500).json({ success: false, error: '❌ Server error during account deletion.' });
  }
});

// =========================================================================
// 📱 ROUTE 6: COMMIT RECHARGE TRANSACTION TO MYSQL (POST)
// =========================================================================
app.post('/api/recharge', async (req, res) => {
  const { username, phoneNumber, provider, price } = req.body;

  if (!username || !phoneNumber || !provider || !price) {
    return res.status(400).json({ success: false, error: '⚠️ Missing transaction parameter nodes.' });
  }

  try {
    const conn = await pool.getConnection();

    // Verify user exists in database before processing recharge
    const [userCheck] = await conn.execute(
      'SELECT id FROM users WHERE username = ?',
      [username.toLowerCase().trim()]
    );

    if (userCheck.length === 0) {
      conn.release();
      return res.status(401).json({ success: false, error: '❌ Unauthorized: user not found in database.' });
    }

    // Insert into recharges log
    await conn.execute(
      'INSERT INTO recharges (username, phone_number, provider, price) VALUES (?, ?, ?, ?)',
      [username.toLowerCase().trim(), phoneNumber.trim(), provider.trim(), price.trim()]
    );

    // Generate unique order_id for alfa_mtc_orders
    const [countRows] = await conn.execute('SELECT COUNT(*) AS total FROM alfa_mtc_orders');
    const nextIndex = countRows[0].total + 1;
    const orderId = `NPH-ORD-${String(nextIndex).padStart(4, '0')}`;

    // Insert into alfa_mtc_orders history
    await conn.execute(
      'INSERT INTO alfa_mtc_orders (order_id, username, phone_number, provider, price, status) VALUES (?, ?, ?, ?, ?, ?)',
      [orderId, username.toLowerCase().trim(), phoneNumber.trim(), provider.trim(), price.trim(), 'Completed']
    );

    conn.release();

    console.log('----------------------------------------------------');
    console.log(`⚡ [${orderId}] ${provider} ${price} → ${phoneNumber} by ${username}`);
    console.log('----------------------------------------------------');

    res.json({
      success: true,
      message: '🎉 Recharge transaction successfully locked inside database server.',
      orderId
    });

  } catch (err) {
    console.error('❌ Recharge DB Error:', err.message);
    res.status(500).json({ success: false, error: '❌ Server error during telecom transaction processing.' });
  }
});

// =========================================================================
// 📋 ROUTE 7: GET ALFA/MTC ORDER HISTORY BY USERNAME (GET)
// =========================================================================
app.get('/api/orders/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const conn = await pool.getConnection();

    const [orders] = await conn.execute(
      'SELECT * FROM alfa_mtc_orders WHERE username = ? ORDER BY created_at DESC',
      [username.toLowerCase()]
    );

    conn.release();

    res.json({ success: true, orders });

  } catch (err) {
    console.error('❌ Fetch orders error:', err.message);
    res.status(500).json({ success: false, error: '❌ Server error fetching order history.' });
  }
});

// 🚀 SERVER PORT BOOTUP
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Node server active on port ${PORT} connected to MySQL`));