module.exports = {
  "compilerOptions": {
    "baseUrl": ".",
    "module": "ESNext",
    "target": "es2016",
    "lib": ["DOM", "ESNext"],
    "strict": true,
    "esModuleInterop": true,
    "incremental": false,
    "skipLibCheck": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "noUnusedLocals": true,
    "strictNullChecks": true,
    "forceConsistentCasingInFileNames": true,
    "paths": {
      "~/*": ["src/*"]
    }
  },
  "exclude": ["dist", "node_modules"]
}