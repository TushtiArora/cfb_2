import { useEffect, useRef } from 'react';

const FloatingShapes3D = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // 3D floating shapes
        const shapes: Array<{
            x: number;
            y: number;
            z: number;
            vx: number;
            vy: number;
            vz: number;
            size: number;
            rotation: number;
            rotationSpeed: number;
            type: 'cube' | 'sphere' | 'pyramid';
            color: string;
        }> = [];

        const colors = [
            '#8b5cf6', '#a855f7', '#c084fc', '#d8b4fe',
            '#ec4899', '#f472b6', '#fb7185', '#fbbf24'
        ];

        // Create shapes
        for (let i = 0; i < 15; i++) {
            shapes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                z: Math.random() * 500 + 100, // Z-depth for 3D effect
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                vz: (Math.random() - 0.5) * 1,
                size: Math.random() * 30 + 20,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.02,
                type: ['cube', 'sphere', 'pyramid'][Math.floor(Math.random() * 3)] as 'cube' | 'sphere' | 'pyramid',
                color: colors[Math.floor(Math.random() * colors.length)]
            });
        }

        // Draw 3D cube
        const drawCube = (shape: typeof shapes[0]) => {
            const perspective = 800;
            const scale = perspective / (perspective + shape.z);
            const size = shape.size * scale;
            const alpha = Math.max(0.1, Math.min(0.8, 1 - shape.z / 500));

            ctx.save();
            ctx.translate(shape.x, shape.y);
            ctx.rotate(shape.rotation);
            ctx.fillStyle = shape.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
            ctx.strokeStyle = shape.color;
            ctx.lineWidth = 2 * scale;

            // Draw cube with 3D effect
            ctx.fillRect(-size / 2, -size / 2, size, size);
            ctx.strokeRect(-size / 2, -size / 2, size, size);

            // Add 3D depth lines
            const offset = size * 0.3;
            ctx.beginPath();
            ctx.moveTo(-size / 2, -size / 2);
            ctx.lineTo(-size / 2 + offset, -size / 2 - offset);
            ctx.lineTo(size / 2 + offset, -size / 2 - offset);
            ctx.lineTo(size / 2, -size / 2);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(size / 2, -size / 2);
            ctx.lineTo(size / 2 + offset, -size / 2 - offset);
            ctx.lineTo(size / 2 + offset, size / 2 - offset);
            ctx.lineTo(size / 2, size / 2);
            ctx.stroke();

            ctx.restore();
        };

        // Draw 3D sphere
        const drawSphere = (shape: typeof shapes[0]) => {
            const perspective = 800;
            const scale = perspective / (perspective + shape.z);
            const size = shape.size * scale;
            const alpha = Math.max(0.1, Math.min(0.8, 1 - shape.z / 500));

            ctx.save();
            ctx.translate(shape.x, shape.y);

            // Create gradient for 3D effect
            const gradient = ctx.createRadialGradient(
                -size * 0.3, -size * 0.3, 0,
                0, 0, size
            );
            gradient.addColorStop(0, shape.color + 'ff');
            gradient.addColorStop(1, shape.color + Math.floor(alpha * 128).toString(16).padStart(2, '0'));

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(0, 0, size, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        };

        // Draw 3D pyramid
        const drawPyramid = (shape: typeof shapes[0]) => {
            const perspective = 800;
            const scale = perspective / (perspective + shape.z);
            const size = shape.size * scale;
            const alpha = Math.max(0.1, Math.min(0.8, 1 - shape.z / 500));

            ctx.save();
            ctx.translate(shape.x, shape.y);
            ctx.rotate(shape.rotation);
            ctx.fillStyle = shape.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
            ctx.strokeStyle = shape.color;
            ctx.lineWidth = 2 * scale;

            // Draw pyramid
            ctx.beginPath();
            ctx.moveTo(0, -size);
            ctx.lineTo(-size, size);
            ctx.lineTo(size, size);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            ctx.restore();
        };

        let animationId: number;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            shapes.forEach((shape) => {
                // Update position
                shape.x += shape.vx;
                shape.y += shape.vy;
                shape.z += shape.vz;
                shape.rotation += shape.rotationSpeed;

                // Boundary checks with wrapping
                if (shape.x < -100) shape.x = canvas.width + 100;
                if (shape.x > canvas.width + 100) shape.x = -100;
                if (shape.y < -100) shape.y = canvas.height + 100;
                if (shape.y > canvas.height + 100) shape.y = -100;
                if (shape.z < 50) shape.z = 600;
                if (shape.z > 600) shape.z = 50;

                // Draw shape based on type
                switch (shape.type) {
                    case 'cube':
                        drawCube(shape);
                        break;
                    case 'sphere':
                        drawSphere(shape);
                        break;
                    case 'pyramid':
                        drawPyramid(shape);
                        break;
                }
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none opacity-20"
            style={{ zIndex: 1 }}
        />
    );
};

export default FloatingShapes3D;