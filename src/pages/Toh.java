// Tower of Hanoi.

public class Q6 {

    public static void TowerOfHanoi(int n, String source, String helper, String destination) {
        if (n == 1) {
            System.out.println("Transfer Disk " + n + " from " + source + " to : " + destination);
            return;
        }

        // Step 1
        TowerOfHanoi(n - 1, source, destination, helper);

        // Step 2
        System.out.println("Transfer Disk " + n + " from " + source + " to : " + destination);

        // Step 3
        TowerOfHanoi(n - 1, helper, source, destination);

    }

    public static void main(String[] args) {
        int n = 5;
        System.out.println();
        TowerOfHanoi(n, "Source", "Helper", "Destination");
    }
}